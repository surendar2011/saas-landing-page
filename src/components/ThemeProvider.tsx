'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from inline script or default to 'light'
  // The inline script in layout.tsx sets the class before React hydrates
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const hasDarkClass = document.documentElement.classList.contains('dark');
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      return storedTheme || (hasDarkClass ? 'dark' : 'light');
    }
    return 'light';
  });

  useEffect(() => {
    // Sync theme with localStorage and document class on mount
    const hasDarkClass = document.documentElement.classList.contains('dark');
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = storedTheme || (hasDarkClass ? 'dark' : 'light');
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
