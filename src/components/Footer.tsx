/**
 * Footer.tsx
 *
 * Composant de pied de page utilisé sur toutes les pages du portfolio.
 * 
 * Contient :
 * - Une section "About" présentant le développeur
 * - Une section "Navigation" avec des liens rapides vers les pages
 * - Une section "Restons connectés" avec des liens vers les réseaux sociaux
 * - Une ligne de copyright dynamique
 */

import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Définition des liens sociaux avec icône, URL et label pour l'accessibilité
  const socialLinks = [
    { icon: Github, href: 'https://github.com/aristide-ghd', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/aristidegbohaïda', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:aristidegbohaida@gmail.com', label: 'Email' },
    { icon: MessageCircle, href: 'https://wa.me/0197460140', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 md:px-8 lg:px-10 xl:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">

            {/* About */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Aristide GBOHAÏDA</h3>
              <p className="text-sm text-muted-foreground">
                Développeur Backend & Fullstack passionné par la création de solutions innovantes.
              </p>
            </div>

            {/* Quick Links / Navigation */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 justify-items-center md:justify-items-start">
                {[
                  { label: 'Accueil', to: '/' },
                  { label: 'À propos', to: '/about' },
                  { label: 'Projets', to: '/projects' },
                  { label: 'Expérience', to: '/experience' },
                  { label: 'Contact', to: '/contact' },
                ].map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Restons connectés</h3>
              <div className="flex gap-4 justify-center md:justify-start flex-wrap">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                    aria-label={label} // Accessibilité pour les lecteurs d'écran
                  >
                    <Icon className="h-5 w-5" /> {/* Icône du réseau social */}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Aristide GBOHAÏDA. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
