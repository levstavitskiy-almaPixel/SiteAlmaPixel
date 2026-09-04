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
  const channelUrl = process.env.TELEGRAM_CHANNEL_URL || "https://t.me/levstavitskiy";

  if (!token) {
    console.log("TELEGRAM_BOT_TOKEN is not set — skip news sync.");
    process.exit(0);
  }

  const offsetFile = await readJson(offsetPath, { offset: 0 });
  const updates = await telegram(token, "getUpdates", {
    offset: (offsetFile.offset || 0) + 1,
    timeout: 0,
    allowed_updates: ["channel_post", "edited_channel_post", "message"],
  });

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

  if (changed) {
    const next = [...byId.values()]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 50);
    await writeFile(
      postsPath,
      JSON.stringify({ posts: next, channelUrl: newsFile.channelUrl || channelUrl }, null, 2) + "\n"
    );
    console.log(`Synced ${changed} Telegram post(s).`);
  } else {
    console.log("No new Telegram posts.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
