import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, User, Briefcase, FolderGit2, Mail } from 'lucide-react';
import { ThemeMode } from '../types';

interface MobileBottomNavProps {
  theme: ThemeMode;
}

export const mobileNavItems = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'About', path: '/about', icon: User },
  { label: 'Resume', path: '/resume', icon: Briefcase },
  { label: 'Projects', path: '/projects', icon: FolderGit2 },
  { label: 'Contact', path: '/contact', icon: Mail },
];

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ theme }) => {
  const location = useLocation();

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-4 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto sm:min-w-[380px] max-w-md mx-auto z-50 pointer-events-auto"
    >
      <div 
        className={`px-3 py-2 rounded-2xl sm:rounded-3xl border flex items-center justify-around shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-[#0f1118]/90 border-white/10 shadow-black/80 text-white'
            : 'bg-slate-900/90 border-slate-700/50 shadow-slate-950/40 text-white'
        }`}
      >
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = 
            location.pathname === item.path || 
            (item.path === '/projects' && location.pathname.startsWith('/projects')) ||
            (item.path === '/resume' && location.pathname.startsWith('/resume'));

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-all duration-200 group ${
                isActive ? 'text-blue-400' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {/* Active Top Blue Glow Line */}
              {isActive && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
              )}

              {/* Icon */}
              <Icon 
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110 text-blue-400 stroke-[2.5]' : 'stroke-[1.75]'
                }`} 
              />

              {/* Label */}
              <span className={`text-[10px] font-medium tracking-tight mt-1 ${
                isActive ? 'font-bold text-blue-400' : 'text-neutral-400'
              }`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
