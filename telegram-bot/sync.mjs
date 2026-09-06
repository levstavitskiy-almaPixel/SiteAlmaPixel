/**
 * Alma Pixel news sync
 *
 * 1. Talk to @BotFather → /newbot
 * 2. Add the bot as admin of your news channel (so it receives channel posts)
 * 3. Copy telegram-bot/.env.example → telegram-bot/.env
 *    TELEGRAM_BOT_TOKEN=...
 *    TELEGRAM_CHANNEL_ID=@your_channel   (or numeric id like -100...)
 * 4. Local test: npm run news:sync
 * 5. GitHub → Settings → Secrets:
 *    TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL_ID, optional TELEGRAM_CHANNEL_URL
 *
 * GitHub Action polls every 15 minutes, writes public/news/posts.json,
 * and retriggers the site deploy.
 */
import { createWriteStream } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const postsPath = path.join(root, "public/news/posts.json");
const mediaDir = path.join(root, "public/news/media");
const offsetPath = path.join(root, "telegram-bot/offset.json");

async function loadDotEnv() {
  try {
    const text = await readFile(path.join(root, "telegram-bot/.env"), "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    /* optional local file */
  }
}

function api(token, method) {
  return `https://api.telegram.org/bot${token}/${method}`;
}

async function telegram(token, method, payload) {
  const res = await fetch(api(token, method), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!data.ok) {
    throw new Error(`${method}: ${data.description || res.status}`);
  }
  return data.result;
}

function matchesChannel(channelId, chat) {
  if (!channelId) return chat?.type === "channel";
  if (channelId.startsWith("@")) {
    return `@${chat?.username || ""}`.toLowerCase() === channelId.toLowerCase();
  }
  return String(chat?.id) === channelId;
}

function pickPhoto(message) {
  const sizes = message.photo;
  if (!Array.isArray(sizes) || sizes.length === 0) return null;
  return sizes[sizes.length - 1];
}

async function downloadFile(token, fileId, destRelative) {
  const file = await telegram(token, "getFile", { file_id: fileId });
  if (!file.file_path) return undefined;
  const url = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
  const res = await fetch(url);
  if (!res.ok || !res.body) return undefined;
  const dest = path.join(root, destRelative);
  await mkdir(path.dirname(dest), { recursive: true });
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  return `/${destRelative.replace(/\\/g, "/").replace(/^public\//, "")}`;
}

function toPost(message, photoUrl) {
  const text = message.text || message.caption || "";
  if (!text && !photoUrl) return null;
  const username = message.chat?.username;
  return {
    id: `tg-${message.chat?.id}-${message.message_id}`,
    date: new Date((message.date || 0) * 1000).toISOString(),
    text,
    photo: photoUrl,
    telegramUrl: username ? `https://t.me/${username}/${message.message_id}` : undefined,
  };
}

function detectLang(text) {
  return /[А-Яа-яЁё]/.test(text) ? "ru" : "en";
}

function sourceText(text) {
  if (!text) return "";
  if (typeof text === "string") return text;
  return text.ru || text.en || "";
}

function hasBothTranslations(text) {
  return Boolean(text && typeof text === "object" && text.en && text.ru);
}

async function translateChunk(text, from, to) {
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", from);
  url.searchParams.set("tl", to);
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", text);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`translate ${res.status}`);
  const data = await res.json();
  return (data[0] || []).map((row) => row[0]).join("");
}

async function translateText(text, from, to) {
  if (!text.trim()) return text;
  const parts = [];
  let rest = text;
  while (rest.length) {
    let chunk = rest.slice(0, 900);
    if (rest.length > 900) {
      const cut = Math.max(chunk.lastIndexOf("\n"), chunk.lastIndexOf(". "));
      if (cut > 200) chunk = rest.slice(0, cut + 1);
    }
    parts.push(await translateChunk(chunk, from, to));
    rest = rest.slice(chunk.length);
  }
  return parts.join("");
}

async function localizeText(text) {
  if (hasBothTranslations(text)) return text;
  const source = sourceText(text);
  if (!source) return { en: "", ru: "" };
  const from = detectLang(source);
  const to = from === "ru" ? "en" : "ru";
  try {
    const translated = await translateText(source, from, to);
    return from === "ru" ? { ru: source, en: translated } : { en: source, ru: translated };
  } catch {
    return from === "ru" ? { ru: source, en: source } : { en: source, ru: source };
  }
}

function decodeHtml(value) {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

async function seedFromPublicChannel(username, byId) {
  const res = await fetch(`https://t.me/s/${username}`);
  if (!res.ok) return 0;
  const html = await res.text();
  const blocks = html.split('class="tgme_widget_message ');
  let added = 0;

  for (const block of blocks) {
    const postMatch = block.match(/data-post="([^"]+)"/);
    if (!postMatch) continue;
    const [channelName, messageId] = postMatch[1].split("/");
    if (!messageId) continue;

    const textMatch = block.match(/class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/);
    const text = textMatch ? decodeHtml(textMatch[1]) : "";
    const dateMatch = block.match(/datetime="([^"]+)"/);
    const photoMatch = block.match(/tgme_widget_message_photo_wrap[^>]*background-image:url\('([^']+)'\)/);

    const id = `tg-public-${channelName}-${messageId}`;
    if (!text && !photoMatch) continue;
    if (byId.has(id) || byId.has(`tg--100${channelName}-${messageId}`)) continue;

    byId.set(id, {
      id,
      date: dateMatch ? new Date(dateMatch[1]).toISOString() : new Date().toISOString(),
      text,
      photo: photoMatch?.[1],
      telegramUrl: `https://t.me/${channelName}/${messageId}`,
    });
    added += 1;
  }

  return added;
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

async function main() {
  await loadDotEnv();
  const token = process.env.TELEGRAM_BOT_TOKEN || "";
  const channelId = String(process.env.TELEGRAM_CHANNEL_ID || "").trim();
  let channelUrl = process.env.TELEGRAM_CHANNEL_URL || "https://t.me/levstavitskiy";
  let channelUsername = "";

  if (!token) {
    console.log("TELEGRAM_BOT_TOKEN is not set — skip news sync.");
    process.exit(0);
  }

  await telegram(token, "deleteWebhook", { drop_pending_updates: false });

  if (channelId) {
    try {
      const chat = await telegram(token, "getChat", { chat_id: channelId });
      if (chat?.username) {
        channelUsername = chat.username;
        channelUrl = `https://t.me/${chat.username}`;
      } else if (String(chat?.id || "").startsWith("-100")) {
        channelUrl = `https://t.me/c/${String(chat.id).slice(4)}`;
      }
      console.log(
        `Channel ok: ${chat?.title || channelId}${channelUsername ? ` (@${channelUsername})` : ""}`
      );
    } catch (err) {
      console.log(
        `Cannot read channel ${channelId}. Add @AlmaPixelNewsBot as a channel admin, then run news:sync again.`
      );
      if (err instanceof Error && err.message) {
        console.log(err.message.replace(/bot\d+:[A-Za-z0-9_-]+/g, "bot***"));
      }
    }
  }

  const offsetFile = await readJson(offsetPath, { offset: 0 });
  const updates = await telegram(token, "getUpdates", {
    offset: offsetFile.offset ? offsetFile.offset + 1 : 0,
    timeout: 0,
    allowed_updates: ["channel_post", "edited_channel_post", "message"],
  });
  console.log(`Pending Telegram updates: ${updates.length}`);

  const newsFile = await readJson(postsPath, { posts: [], channelUrl });
  const posts = Array.isArray(newsFile.posts) ? [...newsFile.posts] : [];
  const byId = new Map(posts.map((post) => [post.id, post]));

  let maxOffset = offsetFile.offset || 0;
  let changed = 0;

  await mkdir(mediaDir, { recursive: true });

  for (const update of updates) {
    maxOffset = Math.max(maxOffset, update.update_id);
    const message = update.channel_post || update.edited_channel_post || update.message;
    if (!message) continue;
    if (update.message && !matchesChannel(channelId, message.chat)) continue;
    if (
      (update.channel_post || update.edited_channel_post) &&
      !matchesChannel(channelId, message.chat)
    ) {
      continue;
    }
    if (typeof message.text === "string" && message.text.startsWith("/")) continue;

    const photo = pickPhoto(message);
    let photoUrl;
    if (photo) {
      const ext = path.extname(photo.file_name || "") || ".jpg";
      photoUrl = await downloadFile(
        token,
        photo.file_id,
        `public/news/media/${message.chat.id}-${message.message_id}${ext}`
      );
    }

    const post = toPost(message, photoUrl);
    if (!post) continue;
    byId.set(post.id, { ...byId.get(post.id), ...post });
    changed += 1;
  }

  if (updates.length) {
    await writeFile(offsetPath, JSON.stringify({ offset: maxOffset }, null, 2) + "\n");
  }

  if (!changed && channelUsername) {
    changed += await seedFromPublicChannel(channelUsername, byId);
  }

  let localized = false;
  const next = [];
  for (const post of [...byId.values()]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 50)) {
    if (hasBothTranslations(post.text)) {
      next.push(post);
      continue;
    }
    localized = true;
    next.push({ ...post, text: await localizeText(post.text) });
  }

  if (changed || localized || newsFile.channelUrl !== channelUrl) {
    await writeFile(postsPath, JSON.stringify({ posts: next, channelUrl }, null, 2) + "\n");
  }

  if (changed) {
    console.log(`Synced ${changed} Telegram post(s).`);
  } else {
    console.log("No new Telegram posts.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
