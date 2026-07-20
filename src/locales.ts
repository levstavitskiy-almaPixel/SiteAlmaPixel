export interface Locale {
  brand: string;
  tagline: string;
  description: string;
  heroCta: string;
  email: string;
  telegram: string;
  nav: {
    games: string;
    about: string;
    contact: string;
    privacy: string;
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
    privacy: {
      title: string;
      lastUpdated: string;
      hub: {
        intro: string;
        generalTitle: string;
        generalDesc: string;
        freeBusincaTitle: string;
        freeBusincaDesc: string;
      };
      sections: {
        introduction: string;
        dataCollection: {
          title: string;
          content: string;
        };
        permissions: {
          title: string;
          camera: string;
          internet: string;
          analytics: string;
        };
        dataUsage: {
          title: string;
          content: string;
        };
        dataStorage: {
          title: string;
          content: string;
        };
        userRights: {
          title: string;
          content: string;
        };
        children: {
          title: string;
          content: string;
        };
        changes: {
          title: string;
          content: string;
        };
        contact: {
          title: string;
          content: string;
        };
      };
    };
  };
  footer: {
    copyright: string;
    privacyLink: string;
    privacyFreeBusinca: string;
  };
}

export const locales: Record<string, Locale> = {
  en: {
    brand: "Alma Pixel",
    tagline: "Games & Apps Studio",
    description: "We create indie games and useful mobile apps — with craft, atmosphere, and thoughtful detail.",
    heroCta: "Our Projects",
    email: "support@alma-pixel.com",
    telegram: "@levstavitskiy",
    nav: {
      games: "Games & Apps",
      about: "About",
      contact: "Contact",
      privacy: "Privacy Policy"
    },
    gameTitles: [
      "Adventure Owl",
      "Bastard", 
      "Coming soon",
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
        title: "Forest",
        artist: "Stavitskaya Daria",
        duration: "3:24",
        src: "/music/Stavitskaya_Daria_Forest.mp3",
        cover: "/music/covers/OwlPlay.png"
      },
      {
        id: "track2", 
        title: "Location bone",
        artist: "Stavitskaya Daria",
        duration: "4:12",
        src: "/music/Stavitskaya_Daria_Location_bone.mp3",
        cover: "/music/covers/OwlPlay.png"
      },
      {
        id: "track3",
        title: "Location Forest",
        artist: "Stavitskaya Daria", 
        duration: "2:58",
        src: "/music/Stavitskaya_Daria_Location_Forest.mp3",
        cover: "/music/covers/OwlPlay.png"
      },
      {
        id: "track4",
        title: "Location swamp",
        artist: "Stavitskaya Daria",
        duration: "3:45",
        src: "/music/Stavitskaya_Daria_Location_swamp.mp3", 
        cover: "/music/covers/OwlPlay.png"
      }
    ],
    sections: {
      games: {
        title: "Games & Apps",
        description: "Games in development, concepts, and mobile apps we ship"
      },
      about: {
        title: "About",
        description1: "Games, apps, atmosphere — crafted with care.",
        description2: "We are a small team inspired by studios like Amanita Design. We make indie games with hand-drawn worlds and atmospheric music, and we also build practical mobile apps. Whether it’s a playful adventure or a focused utility, we care about clarity, craft, and how it feels to use."
      },
      music: {
        title: "Music",
        description: "Immerse yourself in the atmosphere of our games through music. Each track is created specifically for the unique world of our projects."
      },
      contact: {
        title: "Contact",
        description: "Want to learn more about our games, apps, or discuss collaboration?",
        form: {
          name: "Name *",
          email: "Email *",
          subject: "Subject",
          message: "Message *",
          submit: "Send Message",
          orDirect: "or write directly:"
        }
      },
      privacy: {
        title: "Privacy Policy",
        lastUpdated: "Last updated: October 16, 2025",
        hub: {
          intro: "Choose a privacy policy for Alma Pixel services or a specific app.",
          generalTitle: "Alma Pixel (general)",
          generalDesc: "Games, apps, and studio services",
          freeBusincaTitle: "FreeBusinca",
          freeBusincaDesc: "Android app for app time limits and schedules"
        },
        sections: {
          introduction: "Alma Pixel (\"we\", \"our\", or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile applications and services.",
          dataCollection: {
            title: "1. Information We Collect",
            content: "We may collect information that you provide directly to us, such as when you contact us for support. We also automatically collect certain information when you use our applications, including device information, usage data, and analytics data to improve our services."
          },
          permissions: {
            title: "2. Permissions and Data Access",
            camera: "Our applications may request camera permission to enable photo capture features within the app. Images are processed locally on your device and are not transmitted to our servers unless you explicitly choose to share them.",
            internet: "Internet access is required for downloading game content, updates, and for analytics purposes. We use secure connections (HTTPS) for all data transmission.",
            analytics: "We use analytics services to understand how our applications are used, including crash reports and usage statistics. This helps us improve the user experience and fix bugs. Analytics data is anonymized and does not identify individual users."
          },
          dataUsage: {
            title: "3. How We Use Your Information",
            content: "We use the collected information to: provide and maintain our services, improve user experience, analyze usage patterns, respond to support requests, and ensure the security of our applications."
          },
          dataStorage: {
            title: "4. Data Storage and Security",
            content: "We implement appropriate technical and organizational measures to protect your personal information. Data is stored securely and retained only for as long as necessary to fulfill the purposes outlined in this policy."
          },
          userRights: {
            title: "5. Your Rights",
            content: "You have the right to access, update, or delete your personal information. You can also opt-out of certain data collection practices through your device settings. For requests regarding your data, please contact us using the information provided below."
          },
          children: {
            title: "6. Children's Privacy",
            content: "Our applications are not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately."
          },
          changes: {
            title: "7. Changes to This Privacy Policy",
            content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date."
          },
          contact: {
            title: "8. Contact Us",
            content: "If you have any questions about this Privacy Policy, please contact us at: support@alma-pixel.com"
          }
        }
      }
    },
    footer: {
      copyright: "All Rights Reserved.",
      privacyLink: "Privacy Policy",
      privacyFreeBusinca: "FreeBusinca Privacy"
    }
  },
  ru: {
    brand: "Alma Pixel",
    tagline: "Студия игр и приложений",
    description: "Создаём инди-игры и полезные мобильные приложения — с вниманием к атмосфере и деталям.",
    heroCta: "Наши проекты",
    email: "support@alma-pixel.com",
    telegram: "@levstavitskiy",
    nav: {
      games: "Игры и приложения",
      about: "О нас",
      contact: "Контакты",
      privacy: "Политика конфиденциальности"
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
        title: "Forest",
        artist: "Stavitskaya Daria",
        duration: "3:24",
        src: "/music/Stavitskaya_Daria_Forest.mp3",
        cover: "/music/covers/OwlPlay.png"
      },
      {
        id: "track2", 
        title: "Location bone",
        artist: "Stavitskaya Daria",
        duration: "4:12",
        src: "/music/Stavitskaya_Daria_Location_bone.mp3",
        cover: "/music/covers/OwlPlay.png"
      },
      {
        id: "track3",
        title: "Location Forest",
        artist: "Stavitskaya Daria", 
        duration: "2:58",
        src: "/music/Stavitskaya_Daria_Location_Forest.mp3",
        cover: "/music/covers/OwlPlay.png"
      },
      {
        id: "track4",
        title: "Location swamp",
        artist: "Stavitskaya Daria",
        duration: "3:45",
        src: "/music/Stavitskaya_Daria_Location_swamp.mp3", 
        cover: "/music/covers/OwlPlay.png"
      }
    ],
    sections: {
      games: {
        title: "Игры и приложения",
        description: "Игры в разработке, концепты и мобильные приложения, которые мы выпускаем"
      },
      about: {
        title: "О нас",
        description1: "Игры, приложения, атмосфера — с вниманием к деталям.",
        description2: "Мы — небольшая команда, вдохновлённая студиями вроде Amanita Design. Делаем инди-игры с ручной анимацией и атмосферной музыкой, а также практичные мобильные приложения. Будь то игровое приключение или полезный инструмент — нам важны ясность, качество и ощущение от использования."
      },
      music: {
        title: "Музыка",
        description: "Погрузитесь в атмосферу наших игр через музыку. Каждый трек создан специально для уникального мира наших проектов."
      },
      contact: {
        title: "Контакты",
        description: "Хотите узнать больше о наших играх, приложениях или обсудить сотрудничество?",
        form: {
          name: "Имя *",
          email: "Email *",
          subject: "Тема",
          message: "Сообщение *",
          submit: "Отправить сообщение",
          orDirect: "или напишите напрямую:"
        }
      },
      privacy: {
        title: "Политика конфиденциальности",
        lastUpdated: "Последнее обновление: 16 октября 2025",
        hub: {
          intro: "Выберите политику для сервисов Alma Pixel или конкретного приложения.",
          generalTitle: "Alma Pixel (общая)",
          generalDesc: "Игры, приложения и сервисы студии",
          freeBusincaTitle: "FreeBusinca",
          freeBusincaDesc: "Android-приложение для лимитов и расписания приложений"
        },
        sections: {
          introduction: "Alma Pixel (\"мы\", \"наш\" или \"нас\") обязуется защищать вашу конфиденциальность. Настоящая Политика конфиденциальности объясняет, как мы собираем, используем, раскрываем и защищаем вашу информацию при использовании наших мобильных приложений и услуг.",
          dataCollection: {
            title: "1. Информация, которую мы собираем",
            content: "Мы можем собирать информацию, которую вы предоставляете нам напрямую, например, когда вы обращаетесь к нам за поддержкой. Мы также автоматически собираем определенную информацию при использовании наших приложений, включая информацию об устройстве, данные об использовании и аналитические данные для улучшения наших услуг."
          },
          permissions: {
            title: "2. Разрешения и доступ к данным",
            camera: "Наши приложения могут запрашивать разрешение на использование камеры для включения функций фотосъемки в приложении. Изображения обрабатываются локально на вашем устройстве и не передаются на наши серверы, если вы явно не выберете их отправку.",
            internet: "Доступ в интернет необходим для загрузки игрового контента, обновлений и для целей аналитики. Мы используем безопасные соединения (HTTPS) для всех передач данных.",
            analytics: "Мы используем службы аналитики для понимания того, как используются наши приложения, включая отчеты о сбоях и статистику использования. Это помогает нам улучшать пользовательский опыт и исправлять ошибки. Аналитические данные анонимизированы и не идентифицируют отдельных пользователей."
          },
          dataUsage: {
            title: "3. Как мы используем вашу информацию",
            content: "Мы используем собранную информацию для: предоставления и поддержки наших услуг, улучшения пользовательского опыта, анализа моделей использования, ответа на запросы поддержки и обеспечения безопасности наших приложений."
          },
          dataStorage: {
            title: "4. Хранение и безопасность данных",
            content: "Мы применяем соответствующие технические и организационные меры для защиты вашей личной информации. Данные хранятся безопасно и сохраняются только в течение времени, необходимого для выполнения целей, изложенных в настоящей политике."
          },
          userRights: {
            title: "5. Ваши права",
            content: "Вы имеете право на доступ, обновление или удаление вашей личной информации. Вы также можете отказаться от определенных практик сбора данных через настройки вашего устройства. Для запросов относительно ваших данных, пожалуйста, свяжитесь с нами, используя информацию, указанную ниже."
          },
          children: {
            title: "6. Конфиденциальность детей",
            content: "Наши приложения не предназначены для детей в возрасте до 13 лет. Мы не собираем намеренно личную информацию от детей. Если вы считаете, что мы собрали информацию от ребенка, пожалуйста, немедленно свяжитесь с нами."
          },
          changes: {
            title: "7. Изменения в настоящей Политике конфиденциальности",
            content: "Мы можем время от времени обновлять настоящую Политику конфиденциальности. Мы уведомим вас о любых изменениях, разместив новую Политику конфиденциальности на этой странице и обновив дату \"Последнее обновление\"."
          },
          contact: {
            title: "8. Свяжитесь с нами",
            content: "Если у вас есть вопросы о настоящей Политике конфиденциальности, пожалуйста, свяжитесь с нами по адресу: support@alma-pixel.com"
          }
        }
      }
    },
    footer: {
      copyright: "Все права защищены.",
      privacyLink: "Политика конфиденциальности",
      privacyFreeBusinca: "Конфиденциальность FreeBusinca"
    }
  }
};