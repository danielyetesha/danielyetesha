import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { contactInfo } from '../../data/resumeData';
import { ThemeMode } from '../../types';
import homeWorkspaceBg from '../../assets/images/home_workspace_bg_1785956069636.jpg';
import danielPortraitBg from '../../assets/images/daniel_portrait.jpg';

interface HeroSlideProps {
  onOpenResume: () => void;
  theme: ThemeMode;
}

export const HeroSlide: React.FC<HeroSlideProps> = ({ onOpenResume, theme }) => {
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  const handleImageMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoverPos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleImageMouseLeave = () => setHoverPos(null);

  return (
    <div className={`relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-6 overflow-hidden select-none transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
      }`}>
      {/* Background Overlay */}
      {theme === 'dark' && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={homeWorkspaceBg}
            alt="Workspace Ambient"
            className="w-full h-full object-cover object-center filter brightness-[0.18] contrast-[1.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/50" />
        </div>
      )}

      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-4 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* Mobile View Hero Portrait Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:hidden w-full flex justify-center pt-2"
        >
          <div
            className="relative w-full max-w-xs aspect-[4/3] rounded-3xl overflow-hidden shadow-md"
            onMouseMove={handleImageMouseMove}
            onMouseLeave={handleImageMouseLeave}
          >
            <img
              src={danielPortraitBg}
              alt="Daniel Yetesha"
              className="w-full h-full object-cover object-top"
            />
            <img
              src={danielPortraitBg}
              alt="Daniel Yetesha grayscale overlay"
              className="pointer-events-none absolute inset-0 w-full h-full object-cover object-top filter grayscale"
              style={{
                clipPath: hoverPos
                  ? `circle(90px at ${hoverPos.x}px ${hoverPos.y}px)`
                  : 'circle(0px at 0 0)',
                transition: 'clip-path 0.1s ease-out',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-center text-white space-y-0.5">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                Daniel Yetesha
              </div>
              <div className="text-xs font-black">Data Analyst & Scientist</div>
            </div>
          </div>
        </motion.div>

        {/* Text Content Column: Centered and full width on mobile, left-aligned on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:col-span-7 space-y-5 text-center lg:text-left mx-auto"
        >
          {/* Greeting Pill */}
          <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest ${theme === 'dark'
            ? 'bg-neutral-900 text-neutral-300'
            : 'bg-slate-200 text-slate-800'
            }`}>
            Welcome To My Portfolio
          </div>

          {/* Intro Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-tight">
              Hi, I am <br />
              <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
                Daniel Yetesha
              </span>
            </h1>

            <h2 className={`text-base sm:text-2xl font-bold tracking-wide uppercase font-mono ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
              }`}>
              Data Analyst & Scientist
            </h2>
          </div>

          {/* Simple Tagline */}
          <p className={`text-sm sm:text-lg max-w-xl font-light leading-relaxed mx-auto lg:mx-0 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'
            }`}>
            I transform raw numbers into strategic clarity, building automated analytics tools, financial intelligence dashboards, and predictive models.
          </p>

          {/* Action Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            <Link
              to="/resume"
              className={`px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-sm ${theme === 'dark'
                ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                }`}
            >
              Explore Resume
            </Link>

            <Link
              to="/projects"
              className={`px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-sm ${theme === 'dark'
                ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                }`}
            >
              View Projects
            </Link>

            <Link
              to="/contact"
              className={`px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-sm ${theme === 'dark'
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
            >
              Get In Touch
            </Link>
          </div>
        </motion.div>

        {/* Desktop View Right Column Portrait */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden lg:flex lg:col-span-5 justify-end"
        >
          <div
            className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-md"
            onMouseMove={handleImageMouseMove}
            onMouseLeave={handleImageMouseLeave}
          >
            <img
              src={danielPortraitBg}
              alt="Daniel Yetesha"
              className="w-full h-full object-cover object-top filter brightness-95"
            />
            <img
              src={danielPortraitBg}
              alt="Daniel Yetesha grayscale overlay"
              className="pointer-events-none absolute inset-0 w-full h-full object-cover object-top filter brightness-95 grayscale"
              style={{
                clipPath: hoverPos ? `circle(90px at ${hoverPos.x}px ${hoverPos.y}px)` : 'circle(0px at 0 0)',
                transition: 'clip-path 0.15s ease-out',
              }}
            />
            <div className={`absolute bottom-4 left-4 right-4 p-4 rounded-2xl space-y-0.5 ${theme === 'dark'
              ? 'bg-black/80 text-white'
              : 'bg-white/90 text-slate-900 shadow-md'
              }`}>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                Daniel Yetesha
              </div>
              <div className="text-sm font-black">Data Analyst & Scientist</div>
              <div className={`text-[11px] font-mono ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'
                }`}>
                Addis Ababa, Ethiopia
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Contact Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t text-xs font-mono ${theme === 'dark'
          ? 'border-neutral-800/60 text-neutral-400'
          : 'border-slate-200 text-slate-600'
          }`}
      >
        <div className="flex items-center space-x-6 mx-auto sm:mx-0">
          <a
            href={`mailto:${contactInfo.email}`}
            className="hover:text-white transition-colors"
          >
            {contactInfo.email}
          </a>

          <a
            href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}
            className="hover:text-white transition-colors"
          >
            {contactInfo.phone}
          </a>
        </div>

        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>{contactInfo.location}</span>
        </div>
      </motion.div>
    </div>
  );
};
