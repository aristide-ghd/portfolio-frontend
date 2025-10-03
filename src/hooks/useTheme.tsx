import { useContext } from 'react';
import { ThemeProviderContext } from '../components/ThemeProvider';

export type Theme = 'dark' | 'light' | 'system';

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) throw new Error('useTheme doit être utilisé à l’intérieur de ThemeProvider');
  return context;
};
