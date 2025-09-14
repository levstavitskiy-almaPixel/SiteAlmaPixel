import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import MovieClipAnimation from "./components/MovieClipAnimation";
import MusicCard from "./components/MusicCard";

const SITE = {
  brand: "Alma Pixel",
  tagline: "Indie Game Studio",
  description:
    "Создаем уникальные инди-игры с ручной анимацией, атмосферной музыкой и глубоким геймплеем.",
  email: "hello@alma-pixel.com",
  telegram: "@levstavitskiy",
  gameTitles: [
    "Pixel Dreams",
    "Forest Tales", 
    "Cosmic Journey",
    "Mystic Garden",
    "Neon City",
    "Ocean Depths",
    "Mountain Peak",
    "Desert Mirage"
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
  ]
};

// Функция для автоматического создания игр на основе доступных изображений
const generateGames = () => {
  const games = [];
  const maxImages = 8; // Максимальное количество изображений
  
  for (let i = 1; i <= maxImages; i++) {
    const imageSrc = `/shot-${i}.png`;
    const titleIndex = (i - 1) % SITE.gameTitles.length;
    const subtitleIndex = (i - 1) % SITE.gameSubtitles.length;
    const statusIndex = (i - 1) % SITE.gameStatuses.length;
    
    games.push({
      title: SITE.gameTitles[titleIndex],
      subtitle: SITE.gameSubtitles[subtitleIndex],
      src: imageSrc,
      alt: `${SITE.gameTitles[titleIndex]} - скриншот`,
      status: SITE.gameStatuses[statusIndex]
    });
  }
  
  return games;
};

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">{children}</div>
);

const HorizontalScroll = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative">
            <div
              ref={scrollRef}
              className="flex gap-32 overflow-x-auto pb-4 games-scroll cursor-grab select-none"
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', gap: '128px' }}
            >
    {children}
  </div>
      
      {/* Градиенты для скролла */}
      <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-gray-900/50 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-gray-900/50 to-transparent pointer-events-none"></div>
    </div>
  );
};

const GameCard = ({ game, index }: { game: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="group cursor-pointer w-full"
  >
    <div className="relative rounded-lg bg-gray-800 overflow-hidden mx-4">
      <div className="w-full h-48 flex items-center justify-center overflow-visible p-3">
        <img 
          src={game.src} 
          alt={game.alt} 
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" 
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <h3 className="text-base font-semibold">{game.title}</h3>
        <p className="text-xs opacity-90">{game.subtitle}</p>
      </div>
    </div>
    <div className="mt-2" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
      <h3 className="text-base font-semibold text-white">{game.title}</h3>
      <p className="text-xs text-gray-300">{game.subtitle}</p>
      <span className="inline-block mt-1 text-xs font-medium text-amber-400">
        {game.status}
      </span>
    </div>
  </motion.div>
);

const IconSun = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
  </svg>
);

const IconMoon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
  </svg>
);

export default function App() {
  const [dark, setDark] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    
    // Создаем mailto ссылку с данными формы
    const mailtoBody = `Имя: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
    const mailtoSubject = subject ? `Тема: ${subject}` : 'Сообщение с сайта Alma Pixel';
    const mailtoLink = `mailto:${SITE.email}?subject=${encodeURIComponent(mailtoSubject)}&body=${mailtoBody}`;
    
    // Открываем почтовый клиент
    window.location.href = mailtoLink;
  };

  const handlePlayTrack = (trackId: string) => {
    setCurrentTrack(trackId);
  };

  const handleStopTrack = () => {
    setCurrentTrack(null);
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen text-white" style={{ backgroundColor: '#edc77b', fontFamily: 'KosugiMaru, sans-serif' }}>
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-sm bg-black/80 border-b border-gray-800">
          <Container>
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img 
                    src="/AlmaPixelLogo.png?v=2" 
                    alt="Alma Pixel Logo" 
                    className="w-full h-full object-contain"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{SITE.brand}</h1>
                  <p className="text-sm text-gray-400">{SITE.tagline}</p>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center gap-8">
                <a href="#games" className="text-gray-300 hover:text-amber-400 transition-colors">Games</a>
                <a href="#about" className="text-gray-300 hover:text-amber-400 transition-colors">About</a>
                <a href="#contact" className="text-gray-300 hover:text-amber-400 transition-colors">Contact</a>
              </nav>

                <button
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                  onClick={() => setDark((v) => !v)}
                  aria-label="Toggle theme"
                >
                {dark ? <IconSun className="h-5 w-5" /> : <IconMoon className="h-5 w-5" />}
                </button>
            </div>
          </Container>
        </header>

        {/* Divider */}
        <div className="flex justify-center">
          <div className="w-1/2 border-t-2 border-gray-600"></div>
        </div>

        {/* Hero */}
        <section className="py-20 sm:py-32">
        <Container>
            <div className="text-center max-w-4xl mx-auto">
              {/* Banger Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-8"
              >
                <div className="relative mx-auto w-full max-w-2xl">
                  <img 
                    src="/Banger.png" 
                    alt="Banger - Alma Pixel Game" 
                    className="w-full h-auto object-contain rounded-lg shadow-2xl"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl sm:text-2xl text-gray-300 mb-8"
              >
                {SITE.description}
              </motion.p>
            </div>
          </Container>
          </section>

        {/* Divider */}
        <div className="flex justify-center">
          <div className="w-1/2 border-t-2 border-gray-600"></div>
        </div>

        {/* Games */}
        <section id="games" className="py-20 bg-gray-900/50">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Games</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Наши проекты в разработке и концепты будущих игр
              </p>
            </div>
            
            <HorizontalScroll>
              {generateGames().map((game, i) => (
                <div key={i} className="flex-shrink-0 w-80 mx-2">
                  <GameCard game={game} index={i} />
                </div>
              ))}
            </HorizontalScroll>
          </Container>
        </section>

        {/* Divider */}
        <div className="flex justify-center">
          <div className="w-1/2 border-t-2 border-gray-600"></div>
        </div>

        {/* About */}
         <section id="about" className="py-20">
           <Container>
             <div className="max-w-6xl mx-auto">
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                 {/* Текст */}
                 <div className="text-center lg:text-left">
                   <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">About</h2>
                   <div className="prose prose-lg text-gray-300">
                     <p className="text-xl leading-relaxed mb-6">
                       Мы — небольшая команда разработчиков, вдохновленная работами таких студий как Amanita Design, 
                       создаем игры с акцентом на атмосферу, музыку и уникальный визуальный стиль.
                     </p>
                     <p className="text-lg leading-relaxed">
                       Каждая наша игра — это путешествие в особый мир, где каждая деталь продумана, 
                       а игровой процесс приносит радость и умиротворение.
                     </p>
                   </div>
                 </div>
                 
                 {/* Анимация совы */}
                 <div className="flex justify-center lg:justify-end">
                   <MovieClipAnimation 
                     mcPath="/animations/owl_mc.json"
                     texturePath="/animations/owl_tex.png"
                     width={400}
                     height={400}
                     loop={true}
                     className="rounded-lg"
                   />
                 </div>
               </div>
             </div>
           </Container>
         </section>

        {/* Divider */}
        <div className="flex justify-center">
          <div className="w-1/2 border-t-2 border-gray-600"></div>
        </div>

        {/* Music */}
        <section id="music" className="py-20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Music</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Погрузитесь в атмосферу наших игр через музыку. Каждый трек создан специально для уникального мира наших проектов.
              </p>
            </div>
            
            <HorizontalScroll>
              {SITE.musicTracks.map((track) => (
                <MusicCard
                  key={track.id}
                  track={track}
                  isPlaying={currentTrack === track.id}
                  onPlay={handlePlayTrack}
                  onStop={handleStopTrack}
                />
              ))}
            </HorizontalScroll>
            
            {/* Анимации музыкантов */}
            <div className="mt-16 flex items-center justify-center gap-2">
              {/* Анимация лягушки-барда */}
              <MovieClipAnimation 
                mcPath="/animations/frog_bard_mc.json"
                texturePath="/animations/frog_bard_tex.png"
                width={300}
                height={300}
                loop={true}
                className="rounded-lg"
                offsetY={35}
                scale={0.7}
              />
              
              {/* Анимация musicKar */}
              <MovieClipAnimation 
                mcPath="/animations/musicKar_mc.json"
                texturePath="/animations/musicKar_tex.png"
                width={300}
                height={300}
                loop={true}
                className="rounded-lg"
                offsetY={20}
                scale={0.7}
              />
              
              {/* Анимация лисы-музыканта */}
              <MovieClipAnimation 
                mcPath="/animations/fox_Music_mc.json"
                texturePath="/animations/fox_Music_tex.png"
                width={300}
                height={300}
                loop={true}
                className="rounded-lg"
                scale={0.7}
              />
            </div>
          </Container>
        </section>

        {/* Divider */}
        <div className="flex justify-center">
          <div className="w-1/2 border-t-2 border-gray-600"></div>
        </div>

        {/* Contact */}
        <section id="contact" className="py-20 bg-gray-900/50">
          <Container>
            <div className="max-w-sm mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">Contact</h2>
              <p className="text-lg text-gray-300 mb-8">
                Хотите узнать больше о наших проектах или обсудить сотрудничество?
              </p>
              
              {/* BangerContact Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <div className="relative mx-auto">
                  <img 
                    src="/BangerContact.png?v=7" 
                    alt="Banger Contact - Alma Pixel" 
                    className="rounded-lg shadow-2xl"
                    style={{ width: '600px', height: '600px', objectFit: 'contain' }}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
              </motion.div>
              
              {/* Contact Form */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm w-80"
                >
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Имя *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Тема
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Тема сообщения"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Сообщение *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                      placeholder="Расскажите о вашем проекте или вопросе..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    Отправить сообщение
                  </button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    или напишите напрямую: <a href={`mailto:${SITE.email}`} className="text-amber-400 hover:text-amber-300">{SITE.email}</a>
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Telegram: <span className="text-amber-400">{SITE.telegram}</span>
                  </p>
                </div>
                </motion.div>
              </div>
            </div>
          </Container>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-800">
          <Container>
            <div className="text-center text-gray-400">
              {/* BangerDonats Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6"
              >
                <div className="relative mx-auto">
                  <img 
                    src="/BangerDonats.png?v=1" 
                    alt="Banger Donats - Alma Pixel" 
                    className="rounded-lg shadow-2xl"
                    style={{ width: '600px', height: '600px', objectFit: 'contain' }}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
              </div>
              </motion.div>
              
              <p>© {new Date().getFullYear()} {SITE.brand}. All Rights Reserved.</p>
            </div>
          </Container>
        </footer>
      </div>
    </div>
  );
}