/**
 * useTheme.ts
 *
 * Hook personnalisé pour accéder au contexte de thème défini par ThemeProvider.
 * Permet de lire le thème actuel et de le modifier via setTheme.
 */

import { useContext } from 'react';
import { ThemeProviderContext } from '../components/ThemeProvider';

// Type de thème accepté
export type Theme = 'dark' | 'light' | 'system';

/**
 * Hook useTheme
 * 
 * Utilisation :
 * const { theme, setTheme } = useTheme();
 * 
 * - theme : le thème actuel ('dark' | 'light' | 'system')
 * - setTheme : fonction pour changer le thème
 */
export const useTheme = () => {
  // Récupère le contexte du ThemeProvider
  const context = useContext(ThemeProviderContext);

  // Si le hook est utilisé en dehors d’un ThemeProvider, on lève une erreur
  if (!context) 
    throw new Error('useTheme doit être utilisé à l’intérieur de ThemeProvider');

  // Retourne le contexte avec theme et setTheme
  return context;
};
