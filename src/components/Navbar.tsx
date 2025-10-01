import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Verrouille le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    const original = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = original;
    }
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos', path: '/about' },
    { name: 'Projets', path: '/projects' },
    { name: 'Expérience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

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
              Aristide GBOHAÏDA
            </span>
          </Link>

          {/* Desktop Navigation */}
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
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
            <ThemeToggle />
            <Button variant="hero" size="sm" asChild>
              <a href="/cv.pdf" download>
                Télécharger CV
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
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

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden my-3 mx-4 py-4 border border-border bg-background/95 backdrop-blur-md shadow-card rounded-2xl overflow-hidden">
            <div className="flex flex-col gap-2 mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium transition-smooth px-4 py-3 rounded-xl ${
                    isActive(link.path)
                      ? 'bg-primary/15 text-primary'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
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
