export type Lang = "en" | "ru";

export type GameStatus = "in-development" | "coming-soon" | "released";

export type GameAnimation = {
  /** MovieClip JSON. Omit when using DragonBones. */
  mcPath?: string;
  /** DragonBones skeleton JSON. */
  skePath?: string;
  /** DragonBones texture atlas JSON. */
  texPath?: string;
  texturePath: string;
  armature?: string;
  animation?: string;
  width?: number;
  height?: number;
  scale?: number;
  offsetX?: number;
  offsetY?: number;
};

export type GameCopy = {
  title: string;
  subtitle: string;
  statusLabel: string;
  lead: string;
  body: string[];
};

/**
 * Add a new game here. Drop cover art in /public (character portrait on black, ~316×404),
 * optional vertical video in /public/video, then it appears on the home grid
 * and gets its own page at /games/<slug>.
 */
export type Game = {
  slug: string;
  /** Internal folder / project name */
  codeName: string;
  cover: string;
  /** 1080×2400 vertical trailer or gameplay. Leave empty to keep a drop-in slot. */
  video?: string;
  videoPoster?: string;
  accent: string;
  status: GameStatus;
  hidden?: boolean;
  animations?: GameAnimation[];
  store?: {
    googlePlay?: string;
    appStore?: string;
  };
  copy: Record<Lang, GameCopy>;
};

export const GAMES: Game[] = [
  {
    slug: "owl-tale",
    codeName: "OwlAdventure",
    cover: "/shot-1.png?v=7",
    video: "/video/owlTale.mp4",
    videoPoster: "/shot-1.png?v=7",
    accent: "#d4652f",
    status: "in-development",
    animations: [
      {
        skePath: "/animations/owl_ske.json",
        texPath: "/animations/owl_tex.json",
        texturePath: "/animations/owl_tex.png",
        armature: "Armature",
        animation: "idle",
        width: 168,
        height: 200,
        scale: 0.92,
        offsetY: 4,
      },
    ],
    copy: {
      en: {
        title: "Owl Tale",
        subtitle: "Help the little owl overthrow the kings of fairy-tale lands",
        statusLabel: "In development",
        lead: "Help the little owl overthrow the kings of fairy-tale lands.",
        body: [
          "A small knight, a too-big sword, and a map of kingdoms that have sat on their thrones for far too long.",
          "Travel the fairy-tale lands, topple the rulers, and put the owl where a king used to stand.",
        ],
      },
      ru: {
        title: "Owl Tale",
        subtitle: "Помоги совёнку свергнуть королей сказочных земель",
        statusLabel: "В разработке",
        lead: "Помоги совёнку свергнуть королей сказочных земель.",
        body: [
          "Маленький рыцарь, слишком большой меч и карта королевств, которые слишком долго сидели на троне.",
          "Странствуй по сказочным землям, свергай правителей и поставь совёнка туда, где раньше был король.",
        ],
      },
    },
  },
  {
    slug: "beastate",
    codeName: "basterd",
    cover: "/shot-2.png?v=7",
    video: "/video/beastate.mp4",
    videoPoster: "/shot-2.png?v=7",
    accent: "#c45c54",
    status: "in-development",
    animations: [
      {
        skePath: "/animations/img_Politics_ske.json",
        texPath: "/animations/img_Politics_tex.json",
        texturePath: "/animations/img_Politics_tex.png?v=1",
        armature: "Armature",
        animation: "idle",
        width: 240,
        height: 240,
        scale: 0.92,
        offsetY: 6,
      },
    ],
    copy: {
      en: {
        title: "Beastate",
        subtitle: "Rule the animal farm until they overthrow you",
        statusLabel: "In development",
        lead: "Rule the animal farm until they overthrow you.",
        body: [
          "You sit on top of the barnyard. Medals, orders, a nervous crowd of beasts.",
          "Hold power for as long as you can — someone is already measuring your neck for the next hat.",
        ],
      },
      ru: {
        title: "Beastate",
        subtitle: "Правь скотным двором, пока тебя не свергли",
        statusLabel: "В разработке",
        lead: "Правь скотным двором, пока тебя не свергли.",
        body: [
          "Ты на вершине скотного двора. Медали, приказы, нервная толпа зверей.",
          "Удерживай власть, пока можешь — кто-то уже примеривает твою фуражку.",
        ],
      },
    },
  },
  {
    slug: "paw-scrathers",
    codeName: "WizardCat",
    cover: "/shot-3.png?v=7",
    video: "/video/pawScratcers.mp4",
    videoPoster: "/shot-3.png?v=7",
    accent: "#7a5ea8",
    status: "released",
    animations: [
      {
        skePath: "/animations/cat_ske.json",
        texPath: "/animations/cat_tex.json",
        texturePath: "/animations/cat_tex.png",
        armature: "Armature",
        animation: "idle",
        width: 180,
        height: 220,
        scale: 0.92,
        offsetY: 6,
      },
    ],
    store: {
      googlePlay:
        "https://play.google.com/store/apps/details?id=com.almapixel.pawscratchers&hl=ru",
    },
    copy: {
      en: {
        title: "Paw Scrathers",
        subtitle: "You're a cat. Forget what they told you not to scratch.",
        statusLabel: "Released",
        lead: "You're a cat. Forget what they told you not to scratch — in this game you'll do it a lot.",
        body: [
          "No more “don't scratch that.” Here, scratching is the whole point, and you will do it constantly.",
          "Out now on Google Play — not in development, already released.",
        ],
      },
      ru: {
        title: "Paw Scrathers",
        subtitle: "Ты кот. Забудь, что царапать запрещали.",
        statusLabel: "Вышла",
        lead: "Ты кот — забудь о том, что тебе запрещали царапать. В этой игре ты будешь делать это очень много.",
        body: [
          "Никаких «нельзя царапать». Здесь царапать — главное занятие, и делать это придётся постоянно.",
          "Игра уже вышла и доступна в Google Play.",
        ],
      },
    },
  },
  {
    slug: "project-4",
    codeName: "CrazyFishing",
    cover: "/shot-4.png?v=7",
    video: "/video/crazyFishing.mp4",
    videoPoster: "/shot-4.png?v=7",
    accent: "#3a8ea8",
    status: "coming-soon",
    animations: [
      {
        skePath: "/animations/fishCat/Cat_ske.json",
        texPath: "/animations/fishCat/Cat_tex.json",
        texturePath: "/animations/fishCat/Cat_tex.png?v=1",
        armature: "Armature",
        animation: "idle",
        width: 280,
        height: 240,
        scale: 0.88,
        offsetX: -8,
        offsetY: 8,
      },
    ],
    copy: {
      en: {
        title: "Project 4",
        subtitle: "Catch as much fish as you can. Unlock new waters.",
        statusLabel: "In development",
        lead: "Catch as much fish as you can. Unlock new waters.",
        body: [
          "Fill the bucket, chase bigger catches, and open waters you have never fished before.",
        ],
      },
      ru: {
        title: "Проект 4",
        subtitle: "Налови как можно больше рыбы. Открывай новые воды.",
        statusLabel: "В разработке",
        lead: "Налови как можно больше рыбы. Открывай новые воды.",
        body: [
          "Набивай садок, гонись за уловом покрупнее и открывай воды, где ещё не бывал.",
        ],
      },
    },
  },
];

export function publishedGames(): Game[] {
  return GAMES.filter((game) => !game.hidden);
}

export function getGame(slug: string | undefined): Game | undefined {
  if (!slug) return undefined;
  return GAMES.find((game) => game.slug === slug);
}
