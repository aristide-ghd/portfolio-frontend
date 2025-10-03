/**
 * Navbar.tsx
 *
 * Composant de navigation principal du portfolio.
 * 
 * Fonctionnalités :
 * - Affiche le logo et le nom du développeur
 * - Navigation desktop et mobile responsive
 * - Indique la page active
 * - Bouton pour télécharger le CV
 * - Intègre le ThemeToggle pour changer le thème clair/sombre
 * - Verrouille le scroll lorsque le menu mobile est ouvert
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Contrôle l'ouverture du menu mobile
  const [scrolled, setScrolled] = useState(false); // Indique si l'utilisateur a scrollé
  const location = useLocation(); // Hook pour connaître la route actuelle

  // -------------------- GESTION DU SCROLL --------------------
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // Si l'utilisateur a scrollé > 20px, ajouter un fond
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // -------------------- VERROUILLAGE DU SCROLL BODY QUAND MENU MOBILE --------------------
  useEffect(() => {
    const original = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Empêche le scroll
    } else {
      document.body.style.overflow = original; // Restaure le scroll
    }
    return () => {
      document.body.style.overflow = original; // Nettoyage au démontage
    };
  }, [isOpen]);

  // -------------------- LIENS DE NAVIGATION --------------------
  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos', path: '/about' },
    { name: 'Projets', path: '/projects' },
    { name: 'Expérience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  // Vérifie si le lien est actif
  const isActive = (path: string) => location.pathname === path;

  // -------------------- RENDER --------------------
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-card' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover-glow">
            {/* <Code2 className="h-6 w-6 text-primary" /> */}
            <span className="text-xl font-bold text-gradient-primary">
              Eboun-Oluwa
            </span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-smooth relative ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-current={isActive(link.path) ? 'page' : undefined} // Accessibilité
              >
                {link.name}
                {/* Soulignement de la page active */}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}

            {/* Toggle thème clair/sombre */}
            <ThemeToggle />

            {/* Bouton Télécharger CV */}
            <Button variant="hero" size="sm" asChild>
              <a href="/cv.pdf" download>
                Télécharger CV
              </a>
            </Button>
          </div>

          {/* Bouton menu mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-smooth"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Ouvrir le menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navigation Mobile */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden my-3 mx-4 py-4 border border-border bg-background/95 backdrop-blur-md shadow-card rounded-2xl overflow-hidden">
            <div className="flex flex-col gap-2 mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)} // Ferme le menu après clic
                  className={`text-base font-medium transition-smooth px-4 py-3 rounded-xl ${
                    isActive(link.path)
                      ? 'bg-primary/15 text-primary'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Actions supplémentaires dans le menu mobile */}
              <div className="flex items-center gap-3 mx-4 mt-2">
                <ThemeToggle />
                <Button variant="hero" size="lg" className="flex-1" asChild>
                  <a href="/cv.pdf" download>
                    Télécharger CV
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
