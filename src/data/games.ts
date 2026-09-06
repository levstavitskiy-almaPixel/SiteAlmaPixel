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
  /** Line shown in the story block, above the owlet. */
  storyHook?: string;
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
  /** Static art shown above the story text. */
  storyBeforeImage?: string;
  /** DragonBones / MovieClip shown after the story text. */
  storyAfter?: GameAnimation;
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
    storyBeforeImage: "/animations/owlTale/Crow-wood.png?v=4",
    storyAfter: {
      skePath: "/animations/owlTale/kingWoods_ske.json",
      texPath: "/animations/owlTale/kingWoods_tex.json",
      texturePath: "/animations/owlTale/kingWoods_tex.png",
      armature: "Armature",
      animation: "idle",
      width: 168,
      height: 200,
      scale: 0.92,
      offsetY: 4,
    },
    copy: {
      en: {
        title: "Owl Tale",
        subtitle: "Owl Adventure",
        statusLabel: "In development",
        storyHook: "Write your own adventure of a little brave owlet fighting evil!",
        lead: "A turn-based forest RPG: you walk tile by tile, strike enemies beside you, dodge wolves, foxes and archers, and collect a deck of abilities.",
        body: [
          "Combat is tactics on the field. Turns, range, positions. Abilities from your gear change the board: ignite neighbours, power up a strike, hold a shield, dash out from under an attack. Ignite charges from kills — it burns those standing nearby and buffs your next hit.",
          "Elements are a separate layer. Fire, ice, lightning and poison land on enemies and tiles, combine, and unlock reactions. An enemy catches fire — keep them burning. Hit a wet target with lightning — you get a different effect. Build around a style: blood, fire, shield, or a hybrid.",
          "Between fights — an adventure map. Random events on the trail: a well, a fortune teller, a chest, spirits, strange mushrooms. Your choice decides whether you get coins, healing, an attack boost — or walk into an ambush.",
          "The first location is free. To reach the King of the Forest you have to walk the path and beat two mini-bosses. At the end waits a bear in a crown. Knock the crown off him — and show whose woods these are.",
        ],
      },
      ru: {
        title: "Owl Tale",
        subtitle: "Owl Adventure",
        statusLabel: "В разработке",
        storyHook: "Напиши свою историю приключения маленького отважного совенка борющегося со злом!",
        lead: "Пошаговая лесная RPG: ходишь по клеткам, бьёшь врагов рядом, уворачиваешься от волков, лис и лучников и собираешь колоду способностей.",
        body: [
          "Бой — тактика на поле. Ходы, дистанция, позиции. Способности из экипировки меняют расклад: поджигай соседей, усиливай удар, держи щит, рывком выходи из-под атаки. «Поджог» заряжается убийствами — жжёт рядом стоящих и даёт бонус к следующему удару.",
          "Стихии — отдельный слой. Огонь, лёд, молния и яд вешаются на врагов и клетки, сочетаются и открывают реакции. Поджёгся враг — держи его в огне; ударил по мокрому током — получи другой эффект. Строй билд под стиль: кровь, огонь, щит или гибрид.",
          "Между боями — карта приключений. Случайные события на тропе: колодец, гадалка, сундук, духи, странные грибы. Выбор решает, получишь ли монеты, лечение, усиление атаки — или нарвёшься на засаду.",
          "Первая локация бесплатна. Чтобы добраться до Короля леса, нужно пройти путь и победить двух мини-боссов. В конце ждёт медведь в короне. Снеси с него корону — и покажи, чьи в лесу шишки.",
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
        animation: "wizard",
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
        lead: "In Wizard Cat, enchanted items fall from the sky — each with its own symbol. Draw it with your finger, and the cat sends the artifact straight into the cauldron. Miss — and the progress bar burns faster.",
        body: [
          "The longer you last, the faster the pace: harder symbols, combos, time-slow and field-clear boosters.",
        ],
      },
      ru: {
        title: "Paw Scrathers",
        subtitle: "Ты кот. Забудь, что царапать запрещали.",
        statusLabel: "Вышла",
        lead: "В Wizard Cat с неба летят зачарованные предметы — на каждом свой символ. Нарисуй его пальцем на экране, и кот отправит артефакт прямо в котёл. Ошибись — и время на полоске прогресса сгорит быстрее.",
        body: [
          "Чем дольше держишься, тем быстрее растёт темп: сложные символы, комбо, бустеры замедления времени и очистки поля.",
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
    storyBeforeImage: "/animations/fishCat/Hook1.png",
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
        lead: "In Project 4 you play as a fishing cat: you cast the rod and steer the hook into the deep. The lower you go, the darker and more dangerous it gets — but the catch is worth more. Fish latch onto the hook, and weight and resistance grow: overload the line and it snaps, and the catch is gone.",
        body: [
          "On the surface you toss out what you caught and draw the fish symbols with gestures to cash them into coins. Spend them on hooks, lines and extras — from a lamp for the depths to help with drawing — and unlock new waters, like the deeper, darker “Deep”.",
          "Visually the game is a soft 2D look: animated characters, a watercolor “paper” picture, and the feeling of a calm but thrilling fishing trip.",
        ],
      },
      ru: {
        title: "Проект 4",
        subtitle: "Налови как можно больше рыбы. Открывай новые воды.",
        statusLabel: "В разработке",
        lead: "В Проект 4 ты играешь за кота-рыболова: закидываешь удочку и ведёшь крючок вглубь. Чем ниже — тем темнее и опаснее, зато добыча ценнее. Рыба цепляется к крючку, но вес и сопротивление растут: перегрузишь леску — она порвётся, и улов уйдёт.",
        body: [
          "На поверхности выбрасываешь пойманное и рисуешь жестами символы рыбы, чтобы обналичить монеты. На них покупаешь крючки, лески и аксессуары — от фонаря для глубины до помощи при рисовании — и открываешь новые воды, например более глубокое и тёмное «Глубокое».",
          "Визуально игра в мягкой 2D-эстетике: анимированные персонажи, акварельная «бумажная» картинка и ощущение спокойной, но азартной рыбалки.",
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
