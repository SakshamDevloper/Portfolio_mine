import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-[#D7E2EA]/10 border border-[#D7E2EA]/20 transition-all duration-300 hover:border-[#B600A8]/40 focus:outline-none"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div
        className={`absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${
          theme === 'dark'
            ? 'left-0.5 bg-[#0C0C0C] text-[#BE4C00]'
            : 'left-[calc(100%-26px)] bg-white text-[#B600A8] shadow-md'
        }`}
      >
        {theme === 'dark' ? (
          <Moon className="w-3.5 h-3.5" />
        ) : (
          <Sun className="w-3.5 h-3.5" />
        )}
      </div>
    </button>
  );
};
