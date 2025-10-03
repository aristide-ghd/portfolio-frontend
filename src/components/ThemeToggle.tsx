/**
 * ThemeToggle.tsx
 *
 * Composant pour permettre à l’utilisateur de changer le thème de l’application.
 *
 * Fonctionnalités :
 * - Affiche un bouton avec icônes Soleil / Lune selon le thème actuel
 * - Utilise un menu déroulant pour choisir entre : Clair, Sombre, ou Système
 * - Met à jour le thème via le hook personnalisé `useTheme`
 * - Compatible avec Tailwind CSS et classes `dark` pour transition fluide
 */

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  // Récupère la fonction pour changer le thème
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      {/* Bouton qui déclenche le menu déroulant */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="transition-smooth">
          {/* Icône Soleil / Lune avec transitions pour thème clair/sombre */}
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {/* Accessibilité : lecteur d’écran */}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      {/* Menu déroulant avec choix du thème */}
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Clair</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Sombre</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>Système</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
