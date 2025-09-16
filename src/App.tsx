
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import MovieClipAnimation from "./components/MovieClipAnimation";
import MusicCard from "./components/MusicCard";
import FlyingBirds from "./components/FlyingBirds";
import { locales, type Locale } from "./locales";

// Функция для автоматического создания игр на основе доступных изображений
const generateGames = (locale: Locale) => {
  const games = [];
  const maxImages = 8; // Максимальное количество изображений
  
  for (let i = 1; i <= maxImages; i++) {
    const imageSrc = `/shot-${i}.png`;
    const titleIndex = (i - 1) % locale.gameTitles.length;
    const subtitleIndex = (i - 1) % locale.gameSubtitles.length;
    const statusIndex = (i - 1) % locale.gameStatuses.length;
    
    games.push({
      title: locale.gameTitles[titleIndex],
      subtitle: locale.gameSubtitles[subtitleIndex],
      src: imageSrc,
      alt: `${locale.gameTitles[titleIndex]} - скриншот`,
      status: locale.gameStatuses[statusIndex]
    });
  }
  
  return games;
};

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full overflow-x-hidden">{children}</div>
);

const HorizontalScroll = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentCenterIndex, setCurrentCenterIndex] = useState(0);

  // Инициализация: центрируем первую карточку при загрузке
  useEffect(() => {
    if (scrollRef.current) {
      // С отступами первая карточка уже будет в центре при скролле в начало
      scrollRef.current.scrollLeft = 0;
    }
  }, []);

  // Обновляем позицию при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        const containerWidth = scrollRef.current.clientWidth;
        const cardWidth = 350;
        const scrollPosition = scrollRef.current.scrollLeft;
        
        // Пересчитываем позицию для текущей карточки
        const paddingLeft = containerWidth / 2 - cardWidth / 2; // Отступ для центрирования
        const centerPosition = scrollPosition + containerWidth / 2;
        const nearestIndex = Math.round((centerPosition - paddingLeft) / cardWidth);
        const targetScroll = nearestIndex * cardWidth;
        
        // Позволяем центрировать любую карточку
        scrollRef.current.scrollLeft = targetScroll;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      
      // Притягивание к ближайшей карточке в центре экрана
      const containerWidth = scrollRef.current.clientWidth;
      const cardWidth = 350; // ширина карточки
      const scrollPosition = scrollRef.current.scrollLeft;
      const paddingLeft = containerWidth / 2 - cardWidth / 2; // Отступ для центрирования
      
      // Вычисляем позицию центра экрана относительно скролла
      const centerPosition = scrollPosition + containerWidth / 2;
      
      // Вычисляем индекс ближайшей карточки к центру (учитывая отступ)
      const nearestIndex = Math.round((centerPosition - paddingLeft) / cardWidth);
      
      // Вычисляем позицию скролла, чтобы карточка была в центре
      const targetScroll = nearestIndex * cardWidth;
      
      // Позволяем центрировать любую карточку, включая первую и последнюю
      const finalScroll = targetScroll;
      
      scrollRef.current.scrollTo({
        left: finalScroll,
        behavior: 'smooth'
      });
      
      setCurrentCenterIndex(nearestIndex);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch события для мобильных устройств
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Используем ту же логику притягивания, что и для мыши
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const cardWidth = 350;
      const scrollPosition = scrollRef.current.scrollLeft;
      const paddingLeft = containerWidth / 2 - cardWidth / 2; // Отступ для центрирования
      
      const centerPosition = scrollPosition + containerWidth / 2;
      const nearestIndex = Math.round((centerPosition - paddingLeft) / cardWidth);
      const targetScroll = nearestIndex * cardWidth;
      
      // Позволяем центрировать любую карточку, включая первую и последнюю
      const finalScroll = targetScroll;
      
      scrollRef.current.scrollTo({
        left: finalScroll,
        behavior: 'smooth'
      });
      
      setCurrentCenterIndex(nearestIndex);
    }
  };

  return (
    <div className="relative h-[600px] w-full max-w-full overflow-hidden">
      {/* Центральная область с текстом */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 border-2 border-white/20">
          <h3 className="text-white text-lg font-bold font-chiron-heading text-center">
            Карточка {currentCenterIndex + 1} в центре
          </h3>
          <p className="text-gray-300 text-sm text-center mt-2">
            Скроллите для просмотра других игр
          </p>
        </div>
      </div>
      
      <div
        ref={scrollRef}
        className="flex gap-16 overflow-x-auto overflow-y-hidden pb-4 games-scroll cursor-grab select-none h-full w-full"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none', 
          gap: '0px',
          paddingLeft: 'calc(50vw - 175px)', // Отступ для центрирования первой карточки
          paddingRight: 'calc(50vw - 175px)'  // Отступ для центрирования последней карточки
        }}
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
    className="group cursor-pointer w-full h-full"
  >
    <div className="relative rounded-lg bg-gray-800 overflow-hidden w-full h-full">
      <div className="w-full h-[540px] flex items-center justify-center overflow-hidden">
        <img 
          src={game.src} 
          alt={game.alt} 
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" 
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute bottom-1 left-1 right-1 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <h3 className="text-xs font-semibold font-chiron-heading">{game.title}</h3>
        <p className="text-xs opacity-90">{game.subtitle}</p>
      </div>
    </div>
    {/* Постоянно видимые названия и статус */}
    <div className="h-[60px] bg-gray-800/50 px-4 py-2 flex flex-col justify-center">
      <h3 className="text-sm font-semibold text-white font-chiron-heading truncate">{game.title}</h3>
      <p className="text-xs text-gray-300 truncate">{game.subtitle}</p>
      <span className="text-xs font-medium text-amber-400 mt-1">{game.status}</span>
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
  const [language, setLanguage] = useState<'en' | 'ru'>('en'); // English by default
  
  const locale = locales[language];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    
    // Создаем mailto ссылку с данными формы
    const mailtoBody = `${language === 'en' ? 'Name' : 'Имя'}: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
    const mailtoSubject = subject ? `${language === 'en' ? 'Subject' : 'Тема'}: ${subject}` : `${language === 'en' ? 'Message from Alma Pixel website' : 'Сообщение с сайта Alma Pixel'}`;
    const mailtoLink = `mailto:${locale.email}?subject=${encodeURIComponent(mailtoSubject)}&body=${mailtoBody}`;
    
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
        <div className="min-h-screen w-screen text-white overflow-x-hidden font-chiron-body" style={{ 
          backgroundColor: '#f5f4f0',
          backgroundImage: 'url(/BgSite.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto'
        }}>
          {/* Летающие птицы */}
          <FlyingBirds />
          
          {/* Header */}
          <header 
            className="sticky top-0 z-40 backdrop-blur-sm relative cloud-animation"
            style={{
              backgroundImage: 'url(/Cloud.png)',
              backgroundSize: 'auto 100%',
              backgroundRepeat: 'repeat-x',
              backgroundPosition: '0% 20%'
            }}
          >
            <Container>
            <div className="flex h-[300px] items-start justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-[90px] h-[90px] flex items-center justify-center">
                  <img 
                    src="/AlmaPixelLogo.png?v=2" 
                    alt="Alma Pixel Logo" 
                    className="w-full h-full object-contain"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white font-chiron-heading">{locale.brand}</h1>
                  <p className="text-sm text-gray-400 -mt-1">{locale.tagline}</p>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center gap-8">
                <a href="#games" className="text-gray-300 hover:text-amber-400 transition-colors">{locale.nav.games}</a>
                <a href="#about" className="text-gray-300 hover:text-amber-400 transition-colors">{locale.nav.about}</a>
                <a href="#music" className="text-gray-300 hover:text-amber-400 transition-colors">{locale.sections.music.title}</a>
                <a href="#contact" className="text-gray-300 hover:text-amber-400 transition-colors">{locale.nav.contact}</a>
              </nav>

              <div className="flex items-center gap-2" style={{ position: 'absolute', right: '10px', top: '10px' }}>
                {/* Language Switcher */}
                <div className="flex gap-2">
                  {/* EN Button */}
                  <button
                    onClick={() => setLanguage('en')}
                    className={`text-xl font-bold font-chiron-heading transition-colors ${
                      language === 'en' 
                        ? 'text-white' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  
                  {/* RU Button */}
                  <button
                    onClick={() => setLanguage('ru')}
                    className={`text-xl font-bold font-chiron-heading transition-colors ${
                      language === 'ru' 
                        ? 'text-white' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    РУ
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </header>


        {/* Games */}
        <section id="games" className="py-10 pb-20 bg-gray-900/50 overflow-y-hidden md:overflow-y-hidden" style={{ height: 'auto', minHeight: '700px' }}>
          <Container>
            <div className="text-center mb-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-chiron-heading">{locale.sections.games.title}</h2>
            </div>
            
            <HorizontalScroll>
              {generateGames(locale).map((game, i) => (
                <div key={i} className="flex-shrink-0 w-[350px] h-[600px] mx-1">
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
        <section id="about" className="py-20 md:overflow-y-hidden">
          <Container>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                 {/* Текст */}
                 <div className="text-center lg:text-left">
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 font-chiron-heading">{locale.sections.about.title}</h2>
                   <div className="prose prose-lg text-gray-300">
                     <p className="text-xl leading-relaxed mb-6">
                       {locale.sections.about.description1}
                     </p>
                     <p className="text-lg leading-relaxed">
                       {locale.sections.about.description2}
                     </p>
                   </div>
                 </div>
                 
                 {/* Анимация совы */}
                 <div className="flex justify-center lg:justify-end">
                   <div className="w-[240px] h-[240px] flex items-center justify-center">
                     <MovieClipAnimation 
                       mcPath="/animations/owl_mc.json"
                       texturePath="/animations/owl_tex.png"
                       width={200}
                       height={200}
                       loop={true}
                       className="rounded-lg"
                     />
                   </div>
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
        <section id="music" className="py-20 md:overflow-y-hidden">
          <Container>
            <div className="text-center mb-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-chiron-heading">{locale.sections.music.title}</h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                {locale.sections.music.description}
              </p>
            </div>
            
            <HorizontalScroll>
              {locale.musicTracks.map((track) => (
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
            <div className="mt-16 flex flex-row items-center justify-center -space-x-48 sm:-space-x-56">
              {/* Анимация лягушки-барда */}
              <MovieClipAnimation 
                mcPath="/animations/frog_bard_mc.json"
                texturePath="/animations/frog_bard_tex.png"
                width={400}
                height={450}
                loop={true}
                className="rounded-lg"
                offsetY={35}
                animation="damage"
              />
              
              {/* Анимация musicKar */}
              <MovieClipAnimation 
                mcPath="/animations/musicKar_mc.json"
                texturePath="/animations/musicKar_tex.png"
                width={400}
                height={450}
                loop={true}
                className="rounded-lg"
                offsetY={20}
                animation="idle"
              />
              
              {/* Анимация лисы-музыканта */}
              <MovieClipAnimation 
                mcPath="/animations/fox_Music_mc.json"
                texturePath="/animations/fox_Music_tex.png"
                width={400}
                height={450}
                loop={true}
                className="rounded-lg"
                animation="music"
              />
            </div>
          </Container>
        </section>

        {/* Divider */}
        <div className="flex justify-center">
          <div className="w-1/2 border-t-2 border-gray-600"></div>
        </div>

        {/* Contact */}
        <section id="contact" className="py-20 bg-gray-900/50 md:overflow-y-hidden">
          <Container>
            <div className="max-w-sm mx-auto text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 font-chiron-heading">{locale.sections.contact.title}</h2>
              <p className="text-base sm:text-lg text-gray-300 mb-8">
                {locale.sections.contact.description}
              </p>
              
              {/* Yabloko Animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <div className="relative mx-auto">
                  <MovieClipAnimation 
                    mcPath="/animations/Yabloko_mc.json"
                    texturePath="/animations/Yabloko_tex.png"
                    width={400}
                    height={400}
                    loop={true}
                    className="rounded-lg"
                    animation="animtion0"
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
                        {locale.sections.contact.form.name}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        placeholder={language === 'en' ? 'Your name' : 'Ваше имя'}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        {locale.sections.contact.form.email}
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
                      {locale.sections.contact.form.subject}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder={language === 'en' ? 'Message subject' : 'Тема сообщения'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      {locale.sections.contact.form.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                      placeholder={language === 'en' ? 'Tell us about your project or question...' : 'Расскажите о вашем проекте или вопросе...'}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    {locale.sections.contact.form.submit}
                  </button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    {locale.sections.contact.form.orDirect} <a href={`mailto:${locale.email}`} className="text-amber-400 hover:text-amber-300">{locale.email}</a>
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Telegram: <span className="text-amber-400">{locale.telegram}</span>
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
              
              <p>© {new Date().getFullYear()} {locale.brand}. {locale.footer.copyright}</p>
            </div>
          </Container>
        </footer>
      </div>
    </div>
  );
}