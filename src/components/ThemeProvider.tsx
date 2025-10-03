import React, { createContext, useEffect, useState, useCallback, useMemo, ReactNode } from 'react';
import type { Theme } from '../hooks/useTheme'; // import du type Theme depuis le hook

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'portfolio-theme',
}: ThemeProviderProps) {
  // Initialisation avec valeur du localStorage si possible
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    try {
      const raw = localStorage.getItem(storageKey) as Theme | null;
      if (raw === 'dark' || raw === 'light' || raw === 'system') return raw;
    } catch (err) {
      console.warn('ThemeProvider: impossible de lire localStorage', err);
    }
    return defaultTheme;
  });

  // Application du thème sur <html>
  useEffect(() => {
    const root = document.documentElement;

    const appliquerTheme = (t: Theme) => {
      root.classList.remove('light', 'dark');
      if (t === 'system') {
        const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(sys);
      } else {
        root.classList.add(t);
      }
    };

    appliquerTheme(theme);

    let mql: MediaQueryList | null = null;
    const handler = () => {
      if (theme === 'system') appliquerTheme('system');
    };

    if (theme === 'system' && window.matchMedia) {
      mql = window.matchMedia('(prefers-color-scheme: dark)');
      if (typeof mql.addEventListener === 'function') {
        mql.addEventListener('change', handler);
      } else if (typeof mql.addListener === 'function') {
        mql.addListener(handler);
      }
    }

    return () => {
      if (mql) {
        if (typeof mql.removeEventListener === 'function') {
          mql.removeEventListener('change', handler);
        } else if (typeof mql.removeListener === 'function') {
          mql.removeListener(handler);
        }
      }
    };
  }, [theme]);

  // Setter du thème + stockage local
  const setTheme = useCallback(
    (t: Theme) => {
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(storageKey, t);
        }
      } catch (err) {
        console.warn('ThemeProvider: impossible d’écrire dans le localStorage', err);
      }
      setThemeState(t);
    },
    [storageKey]
  );

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export { ThemeProviderContext };
