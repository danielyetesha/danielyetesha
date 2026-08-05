import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeMode } from './types';
import { Header } from './components/Header';
import { handleDownloadCV } from './utils/downloadCV';

import { HeroSlide } from './components/slides/HeroSlide';
import { AboutSlide } from './components/slides/AboutSlide';
import { ExperienceSlide } from './components/slides/ExperienceSlide';
import { ExperienceDetailSlide } from './components/slides/ExperienceDetailSlide';
import { ProjectsSlide } from './components/slides/ProjectsSlide';
import { ProjectDetailSlide } from './components/slides/ProjectDetailSlide';
import { ContactSlide } from './components/slides/ContactSlide';

// Scroll to top helper on page route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainApp() {
  const location = useLocation();

  // Theme state with localStorage initialization
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('dy_portfolio_theme');
    return (saved as ThemeMode) || 'dark';
  });

  // Toggle Theme
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('dy_portfolio_theme', nextTheme);
  };

  return (
    <div className={`w-full min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-black text-neutral-100 selection:bg-cyan-500 selection:text-black' 
        : 'bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white'
    }`}>
      <ScrollToTop />

      {/* Top Fixed Header with Transparent-at-top scroll logic */}
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenResume={handleDownloadCV}
      />

      {/* Main Page Area with Router */}
      <main className="flex-1 pt-16 sm:pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <Routes location={location}>
              <Route path="/" element={<HeroSlide onOpenResume={handleDownloadCV} theme={theme} />} />
              <Route path="/about" element={<AboutSlide theme={theme} />} />
              <Route path="/resume" element={<ExperienceSlide onOpenResume={handleDownloadCV} theme={theme} />} />
              <Route path="/resume/:id" element={<ExperienceDetailSlide theme={theme} />} />
              <Route path="/projects" element={<ProjectsSlide theme={theme} />} />
              <Route path="/projects/:id" element={<ProjectDetailSlide theme={theme} />} />
              <Route path="/contact" element={<ContactSlide theme={theme} />} />
              <Route path="*" element={<HeroSlide onOpenResume={handleDownloadCV} theme={theme} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}
