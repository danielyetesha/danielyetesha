import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Download } from 'lucide-react';
import { ThemeMode } from '../types';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Resume', path: '/resume' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' }
];

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onOpenResume
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = !isScrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 h-16 sm:h-20 px-6 sm:px-12 lg:px-16 flex items-center justify-between transition-all duration-300 z-50 ${
      isTransparent
        ? theme === 'dark'
          ? 'bg-transparent text-white'
          : 'bg-transparent text-slate-900'
        : theme === 'dark'
          ? 'bg-black/90 text-neutral-100 backdrop-blur-md shadow-sm'
          : 'bg-white/90 text-slate-900 backdrop-blur-md shadow-sm'
    }`}>
      {/* Brand Name */}
      <Link 
        to="/"
        className="flex items-center gap-2 group"
      >
        <div className="flex flex-col">
          <span className="font-black tracking-wider text-base sm:text-lg uppercase">
            Daniel Yetesha
          </span>
          <span className={`text-[10px] sm:text-xs font-mono font-medium tracking-tight ${
            theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'
          }`}>
            Data Analyst & Scientist
          </span>
        </div>
      </Link>

      {/* Main Navigation Links (Desktop Only) */}
      <nav className="hidden md:flex items-center space-x-2 sm:space-x-4 md:space-x-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === '/projects' && location.pathname.startsWith('/projects'));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive: isLinkActive }) => {
                const active = isActive || isLinkActive;
                return `relative px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 ${
                  active
                    ? theme === 'dark'
                      ? 'text-white font-bold'
                      : 'text-slate-900 font-bold'
                    : theme === 'dark'
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-slate-500 hover:text-slate-900'
                }`;
              }}
            >
              {({ isActive: isLinkActive }) => {
                const active = isActive || isLinkActive;
                return (
                  <>
                    {item.label}
                    {active && (
                      <span className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${
                        theme === 'dark' ? 'bg-white' : 'bg-slate-900'
                      }`} />
                    )}
                  </>
                );
              }}
            </NavLink>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <a
          href="tel:+251965570891"
          className={`hidden md:inline-flex items-center gap-1.5 text-xs font-mono font-semibold transition-colors ${
            theme === 'dark' ? 'text-neutral-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>+251-965-570-891</span>
        </a>

        {/* CV Trigger Button */}
        <button
          onClick={onOpenResume}
          title="View Resume CV"
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
            theme === 'dark'
              ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
              : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>CV</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className={`p-2 rounded-full transition-all ${
            theme === 'dark'
              ? 'bg-neutral-900 text-neutral-200 hover:bg-neutral-800'
              : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
          }`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
