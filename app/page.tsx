'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import Image from 'next/image';
import Lenis from 'lenis';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  Star,
  Waves,
  Utensils,
  Dumbbell,
  Sparkles,
  Briefcase,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';

// --- Components ---

const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-48 h-48 mb-12"
      >
        <Image 
          src="/hotel-logo.png" 
          alt="Atlas Logo" 
          fill 
          className="object-contain brightness-0 invert"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="absolute inset-y-0 left-0 bg-atlas-red"
        />
      </div>
      <div className="mt-4 text-[10px] uppercase tracking-[0.5em] text-white/40 font-black">
        {progress}%
      </div>
    </motion.div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'О нас', href: '#about' },
    { name: 'Инфраструктура', href: '#infrastructure' },
    { name: 'Номера', href: '#rooms' },
    { name: 'Контакты', href: '#contacts' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled 
          ? 'py-3 glass-dark shadow-2xl' 
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative w-32 h-12 md:w-44 md:h-16"
        >
          <Image 
            src="/logon.gif" 
            alt="Atlas Logo" 
            fill 
            className="object-contain brightness-0 invert"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link, idx) => (
            <motion.a 
              key={link.name} 
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx + 0.5 }}
              className="text-[10px] font-black text-white/80 hover:text-atlas-red transition-colors tracking-[0.3em] uppercase"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05, backgroundColor: '#C41E3A' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-atlas-red text-white text-[10px] font-black rounded-full transition-all shadow-xl shadow-atlas-red/20 uppercase tracking-[0.2em]"
          >
            Забронировать
          </motion.button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-zinc-950 border-t border-white/5 overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-serif text-white hover:text-atlas-red transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full py-4 bg-atlas-red text-white font-bold rounded-xl uppercase tracking-widest">
                Забронировать
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1.1, 1.2]);

  const titleWords = "Атлас Донецк".split(" ");

  return (
		<section className='relative h-screen w-full overflow-hidden flex items-center justify-center'>
			{/* Background Video with Parallax */}
			<motion.div
				style={{ y, scale }}
				className='absolute inset-0 w-full h-full'>
				<video
					autoPlay
					loop
					muted
					playsInline
					className='w-full h-full object-cover'
					src='/bg-video.webm'
				/>
				<div className='absolute inset-0 bg-black/40 bg-gradient-to-b from-black/20 via-transparent to-black/60' />
			</motion.div>

			<div className='container relative z-10 px-6 text-center'>
				<motion.div style={{ opacity }}>
					<h1 className='font-serif text-5xl md:text-8xl lg:text-9xl text-white mb-8 leading-[0.9] tracking-tighter overflow-hidden'>
						{titleWords.map((word, i) => (
							<motion.span
								key={i}
								initial={{ y: "100%" }}
								animate={{ y: 0 }}
								transition={{
									duration: 1.2,
									delay: 0.8 + i * 0.1,
									ease: [0.22, 1, 0.36, 1],
								}}
								className='inline-block mr-4 last:mr-0'>
								{word}
							</motion.span>
						))}
						<br />
						<motion.span
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 1.5, delay: 1.2 }}
							className='italic text-atlas-red font-light block mt-4'>
							Тихая роскошь
						</motion.span>
					</h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.2, delay: 1.4 }}
						className='text-lg md:text-2xl text-white/70 max-w-3xl mx-auto mb-16 font-light tracking-wide leading-relaxed'>
						Гостинично-ресторанный комплекс 4 звезды в самом сердце города.
						Место, где встречаются комфорт и статус.
					</motion.p>
				</motion.div>

				{/* Search Panel */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.2, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
					className='max-w-5xl mx-auto glass p-3 md:p-5 rounded-3xl md:rounded-full flex flex-col md:flex-row items-center gap-6 shadow-2xl'>
					<div className='flex-1 flex items-center gap-4 px-8 py-4 border-b md:border-b-0 md:border-r border-white/10 w-full group cursor-pointer'>
						<Calendar
							className='text-atlas-red transition-transform group-hover:scale-110'
							size={24}
						/>
						<div className='text-left'>
							<p className='text-[10px] uppercase tracking-[0.2em] text-white/40 font-black mb-1'>
								Заезд - Выезд
							</p>
							<p className='text-sm text-white font-semibold'>Выбрать даты</p>
						</div>
					</div>
					<div className='flex-1 flex items-center gap-4 px-8 py-4 w-full group cursor-pointer'>
						<Users
							className='text-atlas-red transition-transform group-hover:scale-110'
							size={24}
						/>
						<div className='text-left'>
							<p className='text-[10px] uppercase tracking-[0.2em] text-white/40 font-black mb-1'>
								Гости
							</p>
							<p className='text-sm text-white font-semibold'>
								2 Взрослых, 0 Детей
							</p>
						</div>
					</div>
					<motion.button
						whileHover={{ scale: 1.02, backgroundColor: "#C41E3A" }}
						whileTap={{ scale: 0.98 }}
						className='w-full md:w-auto px-12 py-5 bg-atlas-red text-white font-black rounded-full transition-all shadow-2xl uppercase tracking-widest text-sm'>
						Найти номер
					</motion.button>
				</motion.div>
			</div>

			{/* Scroll Indicator */}
			<motion.div
				animate={{ y: [0, 15, 0] }}
				transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
				className='absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4'>
				<span className='text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold'>
					Scroll
				</span>
				<div className='w-[1px] h-16 bg-gradient-to-b from-atlas-red to-transparent' />
			</motion.div>
		</section>
	)
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section id="about" ref={containerRef} className="py-32 md:py-48 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-atlas-red font-black tracking-[0.3em] uppercase text-[10px] mb-6 block">О гостинице</span>
            <h2 className="font-serif text-5xl md:text-7xl mb-12 leading-[1.1] tracking-tight">
              Традиции <br /> гостеприимства
            </h2>
            <div className="space-y-8 text-zinc-500 leading-relaxed text-xl font-light">
              <p>
                Атлас Донецк – отель, который соответствует всем международным стандартам и предлагающий полный набор услуг для полноценного отдыха и эффективной работы: 165 комфортабельных номеров, рестораны, в том числе открытая терраса, лаунж бар, спа и фитнес комплекс с бассейном, салон красоты, комнаты переговоров, конференц и банкетные залы.
              </p>
              <p className="italic font-serif text-zinc-800">
                &quot;Мы гордимся отзывами, которые оставляют о нашем комплексе гости, и всегда оперативно реагируем на все пожелания.&quot;
              </p>
            </div>
            
            <div className="mt-16 flex flex-wrap gap-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="flex items-center gap-4 bg-zinc-50 px-8 py-6 rounded-2xl border border-zinc-100 shadow-sm"
              >
                <Star className="text-atlas-red" fill="currentColor" size={24} />
                <div>
                  <p className="font-bold text-sm">TripAdvisor Top 20</p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400">Award 2013</p>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="flex items-center gap-4 bg-zinc-50 px-8 py-6 rounded-2xl border border-zinc-100 shadow-sm"
              >
                <Sparkles className="text-atlas-red" size={24} />
                <div>
                  <p className="font-bold text-sm">Best Hotel Spa</p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400">Hospitality Awards</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            style={{ y, rotate }}
            className="relative aspect-[3/4] rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]"
          >
            <Image 
              src="/hotel.jpg" 
              alt="Atlas Hotel Exterior" 
              fill 
              className="object-cover scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 text-white">
              <p className="text-6xl font-serif italic mb-2">4*</p>
              <p className="text-xs uppercase tracking-[0.4em] font-bold opacity-60">Premium Experience</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Infrastructure = () => {
  const items = [
    {
      title: 'Atlas Fitness',
      desc: 'Фитнес-центр мирового уровня с бассейном',
      logo: '/fitnes.png',
      size: 'col-span-12 md:col-span-8 h-[500px]',
      bg: 'bg-zinc-950',
      icon: <Dumbbell className="text-atlas-red" size={40} />
    },
    {
      title: 'Рестораны',
      desc: '3 ресторана, терраса и лаунж-бар',
      logo: '/restaurant-logo.png',
      size: 'col-span-12 md:col-span-4 h-[500px]',
      bg: 'bg-atlas-red',
      icon: <Utensils className="text-white" size={40} />
    },
    {
      title: 'SPA & Wellness',
      desc: 'Полное расслабление и уход',
      size: 'col-span-12 md:col-span-4 h-[350px]',
      bg: 'bg-zinc-100',
      icon: <Waves className="text-atlas-red" size={40} />
    },
    {
      title: 'Конференц-залы',
      desc: 'Для ваших деловых встреч',
      size: 'col-span-12 md:col-span-4 h-[350px]',
      bg: 'bg-zinc-100',
      icon: <Briefcase className="text-atlas-red" size={40} />
    },
    {
      title: 'Салон красоты',
      desc: 'Профессиональный сервис',
      size: 'col-span-12 md:col-span-4 h-[350px]',
      bg: 'bg-zinc-100',
      icon: <Sparkles className="text-atlas-red" size={40} />
    }
  ];

  return (
    <section id="infrastructure" className="py-32 md:py-48 bg-zinc-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-atlas-red font-black tracking-[0.3em] uppercase text-[10px] mb-6 block"
          >
            Инфраструктура
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl"
          >
            Все для комфорта
          </motion.h2>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`${item.size} relative rounded-[40px] overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700`}
            >
              <div className={`absolute inset-0 ${item.bg} transition-transform duration-1000 group-hover:scale-110`} />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <motion.div 
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="p-5 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10"
                  >
                    {item.icon}
                  </motion.div>
                  {item.logo && (
                    <div className="relative w-32 h-16">
                      <Image 
                        src={item.logo} 
                        alt={item.title} 
                        fill 
                        className="object-contain brightness-0 invert opacity-80"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
                
                <div className={item.bg === 'bg-zinc-100' ? 'text-zinc-900' : 'text-white'}>
                  <h3 className="text-3xl font-serif mb-3 leading-tight transition-colors group-hover:text-atlas-red">{item.title}</h3>
                  <p className="opacity-60 font-light text-lg">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Rooms = () => {
  const rooms = [
    { name: 'Стандарт Улучшенный', price: '6 000', img: '/nomber1.jpg' },
    { name: 'Премиум', price: '6 500', img: '/premium.jpg' },
    { name: 'Стандарт Двухместный', price: '6 600', img: '/dable.jpg' },
    { name: 'Полулюкс', price: '8 800', img: '/lux1.jpg' },
    { name: 'Люкс', price: '12 000', img: '/lux2.jpg' },
  ];

  return (
    <section id="rooms" className="py-32 md:py-48 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-atlas-red font-black tracking-[0.3em] uppercase text-[10px] mb-6 block"
            >
              Номера и цены
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-serif text-5xl md:text-7xl leading-[1.1]"
            >
              Выберите свой <br /> идеальный номер
            </motion.h2>
          </div>
          <motion.button 
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 text-atlas-red font-black uppercase text-xs tracking-[0.3em] group"
          >
            Все категории <ChevronRight className="transition-transform group-hover:translate-x-2" />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {rooms.map((room, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden mb-8 shadow-2xl">
                <Image 
                  src={room.img} 
                  alt={room.name} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="absolute top-8 right-8 px-6 py-3 bg-white/95 backdrop-blur-xl rounded-full text-zinc-950 font-black text-xs uppercase tracking-widest shadow-xl"
                >
                  от {room.price} ₽
                </motion.div>
              </div>
              <h3 className="text-3xl font-serif mb-4 group-hover:text-atlas-red transition-colors duration-500">{room.name}</h3>
              <p className="text-zinc-500 font-light mb-8 text-lg leading-relaxed">Элегантный интерьер, современное оборудование и безупречный сервис для вашего отдыха.</p>
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: '#C41E3A', color: '#fff' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 border border-zinc-200 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3 group/btn"
              >
                Подробнее <ArrowRight size={14} className="opacity-0 group-hover/btn:opacity-100 transition-all -translate-x-4 group-hover/btn:translate-x-0" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contacts" className="bg-zinc-950 text-white pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="col-span-1 lg:col-span-1">
            <div className="relative w-48 h-20 mb-10">
              <Image 
                src="/hotel-logo.png" 
                alt="Atlas Logo" 
                fill 
                className="object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-white/40 font-light leading-relaxed text-lg">
              Премиальный гостинично-ресторанный комплекс в центре Донецка. Идеальное место для отдыха и бизнеса.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-2xl mb-10">Навигация</h4>
            <ul className="space-y-5 text-white/50 font-light text-lg">
              <li><a href="#about" className="hover:text-atlas-red transition-colors">О нас</a></li>
              <li><a href="#infrastructure" className="hover:text-atlas-red transition-colors">Инфраструктура</a></li>
              <li><a href="#rooms" className="hover:text-atlas-red transition-colors">Номера</a></li>
              <li><a href="#" className="hover:text-atlas-red transition-colors">Бронирование</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-2xl mb-10">Контакты</h4>
            <ul className="space-y-8 text-white/50 font-light text-lg">
              <li className="flex items-start gap-5">
                <MapPin className="text-atlas-red shrink-0 mt-1" size={24} />
                <span>г. Донецк, набережная р. Кальмиус, центр</span>
              </li>
              <li className="flex items-center gap-5">
                <Phone className="text-atlas-red shrink-0" size={24} />
                <span>+7 (XXX) XXX-XX-XX</span>
              </li>
              <li className="flex items-center gap-5">
                <Mail className="text-atlas-red shrink-0" size={24} />
                <span>info@atlas-hotel.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-2xl mb-10">Соцсети</h4>
            <div className="flex gap-6">
              <motion.a 
                whileHover={{ y: -5, backgroundColor: '#E60000' }}
                href="#" 
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center transition-all"
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -5, backgroundColor: '#E60000' }}
                href="#" 
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center transition-all"
              >
                <Facebook size={24} />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">
          <p>© 2025 Атлас Донецк. Все права защищены.</p>
          <p>Design by ITVash</p>
        </div>
      </div>
    </footer>
  );
};

// --- Main Page ---

export default function LandingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Smooth Scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const timer = setTimeout(() => setLoading(false), 2500);
    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress: pageScrollProgress } = useScroll();
  const scaleX = useSpring(pageScrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative selection:bg-atlas-red selection:text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-atlas-red origin-left z-[60]"
        style={{ scaleX }}
      />
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Header />
          <Hero />
          <About />
          <Infrastructure />
          <Rooms />
          <Footer />
        </motion.div>
      )}
    </main>
  );
}
