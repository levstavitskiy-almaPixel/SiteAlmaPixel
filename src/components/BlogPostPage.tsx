import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { type Locale } from "../locales";

interface BlogPostPageProps {
  locale: Locale;
  language: 'en' | 'ru';
}

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[200px] xl:px-[200px]">{children}</div>
);

export default function BlogPostPage({ locale, language }: BlogPostPageProps) {
  const { slug } = useParams<{ slug: string }>();
  
  // Blog post data - можно вынести в отдельный файл или получать из API
  // В будущем можно использовать slug для загрузки разных постов
  const blogPost = {
    title: language === 'en' 
      ? "River Boy Forever - A Journey Through Time" 
      : "River Boy Forever - Путешествие сквозь время",
    author: "Alma Pixel Team",
    date: "2025-01-15",
    category: language === 'en' ? "Development" : "Разработка",
    featuredImage: "/shot-1.png", // Можно заменить на реальное изображение
    content: language === 'en' 
      ? [
          {
            type: "paragraph",
            text: "Welcome to our development blog! Today we're excited to share the story behind River Boy Forever, one of our most ambitious projects to date."
          },
          {
            type: "paragraph",
            text: "This game represents months of hard work, creative exploration, and our passion for creating unique gaming experiences. From the initial concept to the final polish, every step has been a journey of discovery."
          },
          {
            type: "image",
            src: "/shot-2.png",
            alt: "Game development screenshot",
            caption: language === 'en' ? "Early concept art for River Boy Forever" : "Ранний концепт-арт для River Boy Forever"
          },
          {
            type: "heading",
            text: language === 'en' ? "The Vision" : "Видение"
          },
          {
            type: "paragraph",
            text: language === 'en' 
              ? "Our vision for River Boy Forever was to create an atmospheric adventure that combines beautiful hand-drawn art with engaging gameplay mechanics. We wanted players to feel immersed in a world that feels both familiar and mysterious."
              : "Наше видение для River Boy Forever заключалось в создании атмосферного приключения, сочетающего красивую ручную графику с увлекательной игровой механикой. Мы хотели, чтобы игроки почувствовали себя погруженными в мир, который кажется одновременно знакомым и загадочным."
          },
          {
            type: "paragraph",
            text: language === 'en'
              ? "The game features a unique art style inspired by classic adventure games, with each frame carefully crafted to tell a story. The music, composed specifically for this project, enhances the emotional journey of the player."
              : "Игра отличается уникальным художественным стилем, вдохновленным классическими приключенческими играми, где каждый кадр тщательно создан, чтобы рассказать историю. Музыка, написанная специально для этого проекта, усиливает эмоциональное путешествие игрока."
          },
          {
            type: "image",
            src: "/shot-3.png",
            alt: "Gameplay screenshot",
            caption: language === 'en' ? "Exploring the world of River Boy Forever" : "Исследование мира River Boy Forever"
          },
          {
            type: "heading",
            text: language === 'en' ? "Development Process" : "Процесс разработки"
          },
          {
            type: "paragraph",
            text: language === 'en'
              ? "The development process has been both challenging and rewarding. We've iterated on game mechanics, refined the art style, and worked closely with our composer to create the perfect soundtrack."
              : "Процесс разработки был одновременно сложным и полезным. Мы итерировали игровую механику, совершенствовали художественный стиль и тесно сотрудничали с нашим композитором для создания идеального саундтрека."
          },
          {
            type: "paragraph",
            text: language === 'en'
              ? "One of the most exciting aspects has been seeing the game come to life through animation. Each character movement, environmental detail, and interaction has been carefully designed to create a cohesive and immersive experience."
              : "Одним из самых захватывающих аспектов было наблюдение за тем, как игра оживает через анимацию. Каждое движение персонажа, деталь окружения и взаимодействие были тщательно спроектированы для создания целостного и захватывающего опыта."
          }
        ]
      : [
          {
            type: "paragraph",
            text: "Добро пожаловать в наш блог разработки! Сегодня мы рады поделиться историей создания River Boy Forever, одного из наших самых амбициозных проектов на сегодняшний день."
          },
          {
            type: "paragraph",
            text: "Эта игра представляет месяцы упорной работы, творческих исследований и нашей страсти к созданию уникальных игровых впечатлений. От первоначальной концепции до финальной полировки каждый шаг был путешествием открытий."
          },
          {
            type: "image",
            src: "/shot-2.png",
            alt: "Скриншот разработки игры",
            caption: "Ранний концепт-арт для River Boy Forever"
          },
          {
            type: "heading",
            text: "Видение"
          },
          {
            type: "paragraph",
            text: "Наше видение для River Boy Forever заключалось в создании атмосферного приключения, сочетающего красивую ручную графику с увлекательной игровой механикой. Мы хотели, чтобы игроки почувствовали себя погруженными в мир, который кажется одновременно знакомым и загадочным."
          },
          {
            type: "paragraph",
            text: "Игра отличается уникальным художественным стилем, вдохновленным классическими приключенческими играми, где каждый кадр тщательно создан, чтобы рассказать историю. Музыка, написанная специально для этого проекта, усиливает эмоциональное путешествие игрока."
          },
          {
            type: "image",
            src: "/shot-3.png",
            alt: "Скриншот геймплея",
            caption: "Исследование мира River Boy Forever"
          },
          {
            type: "heading",
            text: "Процесс разработки"
          },
          {
            type: "paragraph",
            text: "Процесс разработки был одновременно сложным и полезным. Мы итерировали игровую механику, совершенствовали художественный стиль и тесно сотрудничали с нашим композитором для создания идеального саундтрека."
          },
          {
            type: "paragraph",
            text: "Одним из самых захватывающих аспектов было наблюдение за тем, как игра оживает через анимацию. Каждое движение персонажа, деталь окружения и взаимодействие были тщательно спроектированы для создания целостного и захватывающего опыта."
          }
        ]
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen w-screen text-white overflow-x-hidden font-chiron-body" style={{ 
      backgroundColor: '#f5f4f0',
      backgroundImage: 'url(/BgSite.png)',
      backgroundRepeat: 'repeat',
      backgroundSize: 'auto'
    }}>
      {/* Header */}
      <header 
        className="sticky top-0 z-40 backdrop-blur-sm relative cloud-animation"
        style={{
          backgroundColor: '#216477',
          backgroundImage: 'url(/Cloud.png)',
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: '0% 20%'
        }}
      >
        <Container>
          <div className="flex h-[326px] items-start justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10 pt-2">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-[110px] h-[110px] flex items-center justify-center">
                <img 
                  src="/AlmaPixelLogo.png?v=3" 
                  alt="Alma Pixel Logo" 
                  className="w-full h-full object-contain"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
              <div>
                <h1 className="font-bold font-chiron-heading" style={{ fontSize: '40px', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>{locale.brand}</h1>
                <p className="text-sm -mt-1" style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>{locale.tagline}</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/#games" className="text-gray-300 hover:text-amber-400 transition-colors">{locale.nav.games}</Link>
              <Link to="/#about" className="text-gray-300 hover:text-amber-400 transition-colors">{locale.nav.about}</Link>
              <Link to="/music" className="text-gray-300 hover:text-amber-400 transition-colors">{locale.sections.music.title}</Link>
              <Link to="/contact" className="text-gray-300 hover:text-amber-400 transition-colors">{locale.nav.contact}</Link>
              <Link to="/privacy" className="text-gray-300 hover:text-amber-400 transition-colors">{locale.nav.privacy}</Link>
            </nav>
          </div>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="relative w-full" style={{ backgroundColor: '#216477' }}>
        <div className="relative w-full h-[60vh] min-h-[500px] max-h-[800px] overflow-hidden">
          <img 
            src={blogPost.featuredImage} 
            alt={blogPost.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-amber-400/90 text-gray-900 text-sm font-semibold rounded">
                    {blogPost.category}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-chiron-heading mb-4 text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                  {blogPost.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-200 text-sm md:text-base">
                  <span>{blogPost.author}</span>
                  <span>•</span>
                  <span>{formatDate(blogPost.date)}</span>
                </div>
              </motion.div>
            </Container>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#216477' }}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg prose-invert max-w-none"
            >
              {blogPost.content.map((block, index) => {
                if (block.type === 'paragraph') {
                  return (
                    <p 
                      key={index} 
                      className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6"
                      style={{ fontFamily: 'inherit' }}
                    >
                      {block.text}
                    </p>
                  );
                }
                
                if (block.type === 'heading') {
                  return (
                    <h2 
                      key={index} 
                      className="text-3xl md:text-4xl font-bold font-chiron-heading text-white mt-12 mb-6"
                    >
                      {block.text}
                    </h2>
                  );
                }
                
                if (block.type === 'image') {
                  return (
                    <figure key={index} className="my-12">
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                        <img 
                          src={block.src} 
                          alt={block.alt}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      </div>
                      {block.caption && (
                        <figcaption className="text-center text-gray-400 text-sm mt-4 italic">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }
                
                return null;
              })}
            </motion.article>
          </div>
        </Container>
      </section>

      {/* Navigation Section */}
      <section className="py-12 border-t border-gray-700/50" style={{ backgroundColor: '#216477' }}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <Link 
                to="/#about" 
                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{language === 'en' ? 'Back to News' : 'Назад к новостям'}</span>
              </Link>
              
              <Link 
                to="/#games" 
                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>{language === 'en' ? 'View Games' : 'Посмотреть игры'}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800" style={{ backgroundColor: '#216477' }}>
        <Container>
          <div className="text-center text-gray-400 space-y-2">
            <p>© {new Date().getFullYear()} {locale.brand}. {locale.footer.copyright}</p>
            <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <Link to="/privacy" className="text-amber-400 hover:text-amber-300 transition-colors underline">
                {locale.footer.privacyLink}
              </Link>
              <Link to="/privacy/almabreak" className="text-amber-400 hover:text-amber-300 transition-colors underline">
                {locale.footer.privacyAlmaBreak}
              </Link>
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
