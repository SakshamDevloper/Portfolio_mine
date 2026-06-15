import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, type Theme } from '../../context/ThemeContext';
import { Moon, Sun, Sparkles } from 'lucide-react';

const THEME_META: Record<Theme, { icon: React.ReactNode; label: string; color: string }> = {
  dark: { icon: <Moon className="w-3.5 h-3.5" />, label: 'Dark mode', color: '#BE4C00' },
  light: { icon: <Sun className="w-3.5 h-3.5" />, label: 'Light mode', color: '#B600A8' },
  cartoon: { icon: <Sparkles className="w-3.5 h-3.5" />, label: 'Cartoon mode', color: '#2D1B69' },
};

const THEME_ORDER: Theme[] = ['dark', 'light', 'cartoon'];

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const meta = THEME_META[theme];
  const currentIdx = THEME_ORDER.indexOf(theme);

  return (
    <button
      onClick={toggleTheme}
      className="relative w-20 h-8 rounded-full border transition-all duration-300 hover:scale-105 focus:outline-none overflow-hidden"
      style={{
        background: theme === 'dark' ? 'rgba(215,226,234,0.08)' : theme === 'light' ? 'rgba(0,0,0,0.06)' : '#FFEAA7',
        borderColor: theme === 'cartoon' ? '#2D1B69' : 'rgba(215,226,234,0.2)',
      }}
      aria-label={`Switch to next theme`}
    >
      {/* Track labels */}
      <div className="flex justify-around items-center w-full h-full px-1">
        {THEME_ORDER.map((t, i) => (
          <span
            key={t}
            className="text-[8px] uppercase tracking-widest font-bold transition-opacity duration-300"
            style={{
              opacity: i === currentIdx ? 1 : 0.2,
              color: theme === 'cartoon' ? '#2D1B69' : '#D7E2EA',
            }}
          >
            {t === 'dark' ? 'D' : t === 'light' ? 'L' : 'C'}
          </span>
        ))}
      </div>

      {/* Sliding thumb */}
      <motion.div
        className="absolute top-0.5 w-6 h-7 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: theme === 'dark' ? '#0C0C0C' : theme === 'light' ? 'white' : '#FF6B6B',
          color: meta.color,
        }}
        animate={{
          left: `${(currentIdx / (THEME_ORDER.length - 1)) * (80 - 28)}px`,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={theme}
            initial={{ y: -10, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 10, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {meta.icon}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </button>
  );
};
