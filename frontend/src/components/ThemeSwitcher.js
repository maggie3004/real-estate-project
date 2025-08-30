import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="ml-4 p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
    >
      {theme === 'light' ? (
        <FiMoon className="w-5 h-5 text-gray-700" />
      ) : (
        <FiSun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeSwitcher; 