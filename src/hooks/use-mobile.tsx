/**
 * useIsMobile.ts
 *
 * Hook personnalisé pour détecter si l'utilisateur est sur un écran mobile.
 * Utile pour adapter le rendu ou le comportement du site selon la taille de l'écran.
 */

import * as React from "react";

// Définition du breakpoint mobile (en pixels)
const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // État qui indique si l'écran est considéré comme mobile
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Création d'un MediaQueryList pour surveiller la largeur de l'écran
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Fonction de callback appelée lorsque la largeur change
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Écouteur sur les changements du media query
    mql.addEventListener("change", onChange);

    // Initialisation immédiate à l'état correct au chargement
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Nettoyage lors du démontage du composant
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Renvoie un booléen garanti (pas undefined)
  return !!isMobile;
}
