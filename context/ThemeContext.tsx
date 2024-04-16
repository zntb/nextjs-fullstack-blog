'use client';

import React, { createContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: string;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const getFromLocalStorage = (): string => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem('theme');
    return value || 'light';
  }
  return 'light'; // Default to 'light' if localStorage is not available
};

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<string>(() => {
    return getFromLocalStorage();
  });

  const toggle = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
