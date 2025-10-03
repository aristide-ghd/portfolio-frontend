/**
 * App.tsx
 *
 * Point d'entrée principal de l'application React.
 * Configure le routage, les contextes globaux et les outils comme le thème, les toasts, et Helmet.
 */

import * as React from "react";
import { Toaster } from "@/components/ui/toaster"; // Toasts custom
import { Toaster as Sonner } from "@/components/ui/sonner"; // Autre bibliothèque de toast
import { TooltipProvider } from "@/components/ui/tooltip"; // Fournisseur global pour tooltips
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Client React Query
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // Routage
import { HelmetProvider } from "react-helmet-async"; // Gestion du head (title, meta)
import { ThemeProvider } from "@/components/ThemeProvider"; // Contexte de thème global
import { useTheme } from './hooks/useTheme'; // Hook personnalisé pour accéder au thème
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient(); // Instance React Query

/**
 * Composant temporaire pour déboguer le thème actuel
 */
function Content() {
  const { theme } = useTheme();
  // console.log permet de vérifier le thème actuel dans la console
  console.log('Thème actuel :', theme);
  // Si nécessaire, on peut l'afficher dans le DOM : <div>Thème actuel : {theme}</div>
  return null;
}

/**
 * ScrollToTop
 *
 * Fait défiler automatiquement la page vers le haut à chaque changement de route
 */
function ScrollToTop() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return null;
}

/**
 * App
 *
 * Composant racine de l'application
 * - Fournit le contexte global (React Query, Helmet, Thème)
 * - Gère le routage avec react-router
 * - Active les tooltips et les toasts
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      {/* ThemeProvider fournit le contexte thème pour tous les enfants */}
      <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
        {/* Content peut être utilisé pour debug ou affichage du thème */}
        {/* <Content /> */}

        {/* TooltipProvider : permet d'utiliser les tooltips dans toute l'app */}
        <TooltipProvider>
          {/* Toasters pour les notifications */}
          <Toaster />
          <Sonner />

          {/* Routage principal */}
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/contact" element={<Contact />} />
              {/* Route catch-all pour les pages non trouvées */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
