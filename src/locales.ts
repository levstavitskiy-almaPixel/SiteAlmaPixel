export interface Locale {
  brand: string;
  tagline: string;
  description: string;
  email: string;
  telegram: string;
  nav: {
    games: string;
    about: string;
    contact: string;
  };
  gameTitles: string[];
  gameSubtitles: string[];
  gameStatuses: string[];
  musicTracks: Array<{
    id: string;
    title: string;
    artist: string;
    duration: string;
    src: string;
    cover: string;
  }>;
  sections: {
    games: {
      title: string;
      description: string;
    };
    about: {
      title: string;
      description1: string;
      description2: string;
    };
    music: {
      title: string;
      description: string;
    };
    contact: {
      title: string;
      description: string;
      form: {
        name: string;
        email: string;
        subject: string;
        message: string;
        submit: string;
        orDirect: string;
      };
    };
  };
  footer: {
    copyright: string;
  };
}

export const locales: Record<string, Locale> = {
  en: {
    brand: "Alma Pixel",
    tagline: "Indie Game Studio",
    description: "We create unique indie games with hand-drawn animation, atmospheric music, and deep gameplay.",
    email: "hello@alma-pixel.com",
    telegram: "@levstavitskiy",
    nav: {
      games: "COMING SOON",
      about: "About",
      contact: "Contact"
    },
    gameTitles: [
      "Adventure Owl",
      "Bastard", 
      "Coming soon",
      "Coming soon",
      "Coming soon",
      "Coming soon",
      "Coming soon",
      "Coming soon"
    ],
    gameSubtitles: [
      "A cozy puzzle adventure",
      "An atmospheric platformer", 
      "A space exploration game",
      "A magical gardening sim",
      "A cyberpunk adventure",
      "An underwater exploration",
      "A mountain climbing journey",
      "A desert survival game"
    ],
    gameStatuses: [
      "In Development",
      "In Development",
      "Concept", 
      "Concept",
      "Concept",
      "Concept",
      "Concept",
      "Concept"
    ],
    musicTracks: [
      {
        id: "track1",
        title: "Forest Melody",
        artist: "Alma Pixel",
        duration: "3:24",
        src: "/music/forest-melody.mp3",
        cover: "/music/covers/forest.jpg"
      },
      {
        id: "track2", 
        title: "Cosmic Journey",
        artist: "Alma Pixel",
        duration: "4:12",
        src: "/music/cosmic-journey.mp3",
        cover: "/music/covers/cosmic.jpg"
      },
      {
        id: "track3",
        title: "Pixel Dreams",
        artist: "Alma Pixel", 
        duration: "2:58",
        src: "/music/pixel-dreams.mp3",
        cover: "/music/covers/pixel.jpg"
      },
      {
        id: "track4",
        title: "Mystic Garden",
        artist: "Alma Pixel",
        duration: "3:45",
        src: "/music/mystic-garden.mp3", 
        cover: "/music/covers/mystic.jpg"
      },
      {
        id: "track5",
        title: "Neon City",
        artist: "Alma Pixel",
        duration: "4:33",
        src: "/music/neon-city.mp3",
        cover: "/music/covers/neon.jpg"
      },
      {
        id: "track6",
        title: "Ocean Depths",
        artist: "Alma Pixel",
        duration: "3:17",
        src: "/music/ocean-depths.mp3",
        cover: "/music/covers/ocean.jpg"
      }
    ],
    sections: {
      games: {
        title: "Games",
        description: "Our projects in development and concepts for future games"
      },
      about: {
        title: "About",
        description1: "We are a small team of developers inspired by studios like Amanita Design, creating games with a focus on atmosphere, music, and unique visual style.",
        description2: "Each of our games is a journey into a special world where every detail is thought out, and the gameplay brings joy and tranquility."
      },
      music: {
        title: "Music",
        description: "Immerse yourself in the atmosphere of our games through music. Each track is created specifically for the unique world of our projects."
      },
      contact: {
        title: "Contact",
        description: "Want to learn more about our projects or discuss collaboration?",
        form: {
          name: "Name *",
          email: "Email *",
          subject: "Subject",
          message: "Message *",
          submit: "Send Message",
          orDirect: "or write directly:"
        }
      }
    },
    footer: {
      copyright: "All Rights Reserved."
    }
  },
  ru: {
    brand: "Alma Pixel",
    tagline: "Инди Студия Игр",
    description: "Создаем уникальные инди-игры с ручной анимацией, атмосферной музыкой и глубоким геймплеем.",
    email: "hello@alma-pixel.com",
    telegram: "@levstavitskiy",
    nav: {
      games: "Игры",
      about: "О нас",
      contact: "Контакты"
    },
    gameTitles: [
      "Adventure Owl",
      "Bastard", 
      "Скоро",
      "Скоро",
      "Скоро",
      "Скоро",
      "Скоро",
      "Скоро"
    ],
    gameSubtitles: [
      "Уютное головоломное приключение",
      "Атмосферный платформер", 
      "Игра исследования космоса",
      "Магический симулятор садоводства",
      "Киберпанк приключение",
      "Подводное исследование",
      "Путешествие по горам",
      "Игра выживания в пустыне"
    ],
    gameStatuses: [
      "В разработке",
      "В разработке",
      "Концепт", 
      "Концепт",
      "Концепт",
      "Концепт",
      "Концепт",
      "Концепт"
    ],
    musicTracks: [
      {
        id: "track1",
        title: "Forest Melody",
        artist: "Alma Pixel",
        duration: "3:24",
        src: "/music/forest-melody.mp3",
        cover: "/music/covers/forest.jpg"
      },
      {
        id: "track2", 
        title: "Cosmic Journey",
        artist: "Alma Pixel",
        duration: "4:12",
        src: "/music/cosmic-journey.mp3",
        cover: "/music/covers/cosmic.jpg"
      },
      {
        id: "track3",
        title: "Pixel Dreams",
        artist: "Alma Pixel", 
        duration: "2:58",
        src: "/music/pixel-dreams.mp3",
        cover: "/music/covers/pixel.jpg"
      },
      {
        id: "track4",
        title: "Mystic Garden",
        artist: "Alma Pixel",
        duration: "3:45",
        src: "/music/mystic-garden.mp3", 
        cover: "/music/covers/mystic.jpg"
      },
      {
        id: "track5",
        title: "Neon City",
        artist: "Alma Pixel",
        duration: "4:33",
        src: "/music/neon-city.mp3",
        cover: "/music/covers/neon.jpg"
      },
      {
        id: "track6",
        title: "Ocean Depths",
        artist: "Alma Pixel",
        duration: "3:17",
        src: "/music/ocean-depths.mp3",
        cover: "/music/covers/ocean.jpg"
      }
    ],
    sections: {
      games: {
        title: "Игры",
        description: "Наши проекты в разработке и концепты будущих игр"
      },
      about: {
        title: "О нас",
        description1: "Мы — небольшая команда разработчиков, вдохновленная работами таких студий как Amanita Design, создаем игры с акцентом на атмосферу, музыку и уникальный визуальный стиль.",
        description2: "Каждая наша игра — это путешествие в особый мир, где каждая деталь продумана, а игровой процесс приносит радость и умиротворение."
      },
      music: {
        title: "Музыка",
        description: "Погрузитесь в атмосферу наших игр через музыку. Каждый трек создан специально для уникального мира наших проектов."
      },
      contact: {
        title: "Контакты",
        description: "Хотите узнать больше о наших проектах или обсудить сотрудничество?",
        form: {
          name: "Имя *",
          email: "Email *",
          subject: "Тема",
          message: "Сообщение *",
          submit: "Отправить сообщение",
          orDirect: "или напишите напрямую:"
        }
      }
    },
    footer: {
      copyright: "Все права защищены."
    }
  }
};
