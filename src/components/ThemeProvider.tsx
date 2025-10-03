/**
 * ThemeProvider.tsx
 *
 * Ce fichier contient le ThemeProvider qui permet de gérer le thème global
 * de l'application (dark / light / system) via un contexte React.
 * 
 * Composants enfants peuvent utiliser le hook `useTheme` pour accéder au thème
 * courant et le modifier.
 */

import React, { createContext, useEffect, useState, useCallback, useMemo, ReactNode } from 'react';
import type { Theme } from '../hooks/useTheme'; // import du type Theme depuis le hook

// -------------------- TYPES --------------------

// Props attendues par le ThemeProvider
type ThemeProviderProps = {
  children: ReactNode;         // Composants enfants qui utiliseront le contexte
  defaultTheme?: Theme;        // Thème par défaut si aucun thème enregistré
  storageKey?: string;         // Clé utilisée pour stocker le thème dans localStorage
};

// Structure du contexte qui sera fourni aux composants enfants
type ThemeProviderState = {
  theme: Theme;                // Thème courant
  setTheme: (theme: Theme) => void; // Fonction pour changer le thème
};

// -------------------- CONTEXTE --------------------

// Contexte initialisé à undefined pour détecter l’absence de Provider
const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

// -------------------- COMPOSANT --------------------

/**
 * ThemeProvider
 *
 * Composant qui englobe l'application et fournit le thème via Context.
 * - Applique le thème sur la balise <html> (dark / light)
 * - Écoute les changements du système si le thème est "system"
 * - Sauvegarde le thème choisi dans localStorage
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'portfolio-theme',
}: ThemeProviderProps) {

  // -------------------- ÉTAT DU THÈME --------------------
  // Initialisation avec valeur du localStorage si possible, sinon defaultTheme
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

  // -------------------- EFFET POUR APPLIQUER LE THÈME --------------------
  useEffect(() => {
    const root = document.documentElement;

    // Fonction pour appliquer le thème sur <html>
    const appliquerTheme = (t: Theme) => {
      root.classList.remove('light', 'dark'); // Supprime les anciennes classes
      if (t === 'system') {
        // Détecte le thème du système (dark / light)
        const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(sys);
      } else {
        root.classList.add(t); // Ajoute la classe correspondant au thème choisi
      }
    };

    appliquerTheme(theme);

    // Écoute des changements du système si mode "system"
    let mql: MediaQueryList | null = null;
    const handler = () => {
      if (theme === 'system') appliquerTheme('system');
    };

    if (theme === 'system' && window.matchMedia) {
      mql = window.matchMedia('(prefers-color-scheme: dark)');
      if (typeof mql.addEventListener === 'function') {
        mql.addEventListener('change', handler);
      } else if (typeof mql.addListener === 'function') {
        mql.addListener(handler); // Ancienne API pour navigateurs plus anciens
      }
    }

    // Nettoyage : supprime le listener quand le composant se démonte
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

  // -------------------- FONCTION POUR CHANGER LE THÈME --------------------
  // Cette fonction change le thème et l'enregistre dans localStorage
  const setTheme = useCallback(
    (t: Theme) => {
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(storageKey, t);
        }
      } catch (err) {
        console.warn('ThemeProvider: impossible d’écrire dans le localStorage', err);
      }
      setThemeState(t); // Met à jour l'état du thème
    },
    [storageKey]
  );

  // Mémoïsation du contexte pour éviter les re-renders inutiles
  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  // -------------------- RENDER --------------------
  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

// Export du contexte pour pouvoir l'utiliser via useContext si nécessaire
export { ThemeProviderContext };
