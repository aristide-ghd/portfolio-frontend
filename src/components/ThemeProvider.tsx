import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// On initialise le contexte à undefined pour détecter l’absence de Provider
const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'portfolio-theme',
}: ThemeProviderProps) {
  // État du thème (on commence avec la valeur par défaut)
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  // Lecture du thème sauvegardé dans localStorage (uniquement côté client)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const raw = localStorage.getItem(storageKey);
      if (raw === 'dark' || raw === 'light' || raw === 'system') {
        setThemeState(raw);
      } else {
        setThemeState(defaultTheme);
      }
    } catch (err) {
      console.warn('ThemeProvider: impossible de lire localStorage', err);
      setThemeState(defaultTheme);
    }
  }, [storageKey, defaultTheme]);

  // Application de la classe CSS sur <html> + gestion du thème système
  useEffect(() => {
    if (typeof window === 'undefined') return;
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

    // Si on est en mode "system", on écoute les changements de thème de l’OS
    let mql: MediaQueryList | null = null;
    const handler = () => {
      if (theme === 'system') appliquerTheme('system');
    };

    if (theme === 'system' && window.matchMedia) {
      mql = window.matchMedia('(prefers-color-scheme: dark)');
      if (typeof mql.addEventListener === 'function') {
        mql.addEventListener('change', handler);
      } else if (typeof mql.addListener === 'function') {
        // Ancienne API (navigateurs plus vieux)
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

  // Setter du thème qui enregistre aussi dans localStorage
  const setTheme = useCallback(
    (t: Theme) => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(storageKey, t);
        } catch (err) {
          console.warn('ThemeProvider: impossible d’écrire dans localStorage', err);
        }
      }
      setThemeState(t);
    },
    [storageKey]
  );

  // Valeur passée au Provider (mémoïsée pour éviter des re-renders inutiles)
  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

// Hook personnalisé pour consommer le contexte
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) throw new Error('useTheme doit être utilisé à l’intérieur de ThemeProvider');
  return context;
};
