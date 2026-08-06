import React, { useState } from 'react';
import { motion } from 'motion/react';
import { contactInfo } from '../../data/resumeData';
import { ThemeMode } from '../../types';
import danielPortraitBg from '../../assets/images/daniel_portrait.jpg';

interface AboutSlideProps {
  theme: ThemeMode;
}

export const AboutSlide: React.FC<AboutSlideProps> = ({ theme }) => {
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
    <div className={`relative w-full min-h-[calc(100vh-5rem)] flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-neutral-100' : 'bg-slate-50 text-slate-900'
      }`}>
      {/* Desktop View Right-Side Portrait Background (Fixed on right half of screen - interactive cursor hover) */}
      <div
        className="hidden lg:block fixed right-0 top-16 sm:top-20 bottom-0 w-1/2 z-0 overflow-hidden"
        onMouseMove={handleImageMouseMove}
        onMouseLeave={handleImageMouseLeave}
      >
        <img
          src={danielPortraitBg}
          alt="Daniel Yetesha"
          className="w-full h-full object-cover object-top filter brightness-90 contrast-105"
        />
        <img
          src={danielPortraitBg}
          alt="Daniel Yetesha grayscale overlay"
          className="pointer-events-none absolute inset-0 w-full h-full object-cover object-top filter brightness-90 grayscale"
          style={{
            clipPath: hoverPos
              ? `circle(120px at ${hoverPos.x}px ${hoverPos.y}px)`
              : 'circle(0px at 0 0)',
            transition: 'clip-path 0.1s ease-out',
          }}
        />
        {theme === 'dark' && (
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Main Content Layout Container (Scrollable left column content) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pointer-events-none">

        {/* Mobile View Hero Portrait Image */}
        <div
          className="lg:hidden w-full h-[280px] sm:h-[360px] rounded-3xl overflow-hidden relative shadow-md"
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
              clipPath: hoverPos ? `circle(100px at ${hoverPos.x}px ${hoverPos.y}px)` : 'circle(0px at 0 0)',
              transition: 'clip-path 0.15s ease-out',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-center text-white">
            <h2 className="text-xl font-black uppercase">Daniel Yetesha</h2>
            <p className="text-xs font-mono text-neutral-300">Data Analyst & Scientist • Bank of Abyssinia</p>
          </div>
        </div>

        {/* Left Half: ABOUT Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 space-y-8 text-center lg:text-left mx-auto w-full py-2 pb-12 pointer-events-auto"
        >
          {/* Header Title with Underline */}
          <div className="space-y-3">
            <div className="inline-block relative">
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wider">
                ABOUT
              </h1>
              {/* White/Monochrome Underline */}
              <div className={`h-1.5 w-24 mt-2 rounded-full mx-auto lg:mx-0 ${theme === 'dark' ? 'bg-white' : 'bg-slate-900'
                }`} />
            </div>

            {/* Email Subtitle */}
            <div className={`pt-2 font-mono text-sm sm:text-base font-semibold ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'
              }`}>
              <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                {contactInfo.email}
              </a>
            </div>
          </div>

          {/* Main Bio Paragraph */}
          <p className={`text-base sm:text-lg leading-relaxed font-light max-w-xl mx-auto lg:mx-0 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'
            }`}>
            {contactInfo.aboutMe}
          </p>

          {/* Quick Pillars Grid */}
          <div className="space-y-3 max-w-xl mx-auto lg:mx-0">
            <span className={`text-xs font-mono font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'
              }`}>
              Key Expertise Pillars
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-medium">
              {contactInfo.expertisePillars.map((pillar, idx) => (
                <div key={idx} className={`p-3 rounded-xl text-left ${theme === 'dark' ? 'bg-[#141414] text-neutral-200' : 'bg-slate-100 text-slate-800'
                  }`}>
                  • {pillar}
                </div>
              ))}
            </div>
          </div>

          {/* Position & Education Snapshot Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0 pt-2">
            <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-[#141414] text-white' : 'bg-white text-slate-900 shadow-sm'
              }`}>
              <div className="text-[11px] font-mono uppercase text-neutral-400">Current Role</div>
              <div className="text-sm font-bold pt-1">Data Insights Specialist</div>
              <div className={`text-xs font-mono pt-0.5 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'}`}>
                Bank of Abyssinia
              </div>
            </div>

            <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-[#141414] text-white' : 'bg-white text-slate-900 shadow-sm'
              }`}>
              <div className="text-[11px] font-mono uppercase text-neutral-400">Education</div>
              <div className="text-sm font-bold pt-1">BSc Computer Science (3.89 GPA)</div>
              <div className={`text-xs font-mono pt-0.5 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'}`}>
                MSc PM Candidate (AAU)
              </div>
            </div>
          </div>

          {/* Bottom Location Indicator */}
          <div className={`pt-6 border-t flex flex-wrap items-center justify-between text-xs font-mono max-w-xl mx-auto lg:mx-0 ${theme === 'dark' ? 'border-neutral-800/60 text-neutral-400' : 'border-slate-200 text-slate-500'
            }`}>
            <div>{contactInfo.location}</div>
            <div className="font-semibold">Bank of Abyssinia HQ</div>
          </div>
        </motion.div>

        {/* Right Half placeholder for Desktop Layout */}
        <div className="hidden lg:block lg:col-span-5 pointer-events-none" />
      </div>
    </div>
  );
};
