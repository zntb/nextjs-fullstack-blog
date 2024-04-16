'use client';

import { ThemeContext } from '@/context/ThemeContext';
import React, { useContext, useEffect, useState } from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme } = useContext(ThemeContext)!;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return <div className={theme}>{children}</div>;
  }
};

export default ThemeProvider;
