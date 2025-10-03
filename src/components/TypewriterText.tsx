/**
 * TypewriterText.tsx
 *
 * Composant pour afficher un effet "machine à écrire" sur un texte.
 *
 * Props :
 * - texts : tableau de chaînes de caractères à afficher successivement
 * - className : classes CSS optionnelles à appliquer au <span> principal
 *
 * Fonctionnalités :
 * - Affiche les textes un par un avec un effet d'écriture caractère par caractère
 * - Supprime ensuite le texte caractère par caractère avant de passer au texte suivant
 * - Boucle infinie sur les textes
 * - Curseur clignotant ajouté à la fin
 */

import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  texts: string[];       // Textes à afficher en boucle
  className?: string;    // Classes CSS optionnelles pour le <span>
}

const TypewriterText = ({ texts, className = '' }: TypewriterTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);  // Index du texte courant
  const [displayText, setDisplayText] = useState('');   // Texte actuellement affiché
  const [isDeleting, setIsDeleting] = useState(false);  // État d'écriture ou suppression

  useEffect(() => {
    const currentText = texts[currentIndex];  // Texte en cours

    // Timer pour ajouter ou supprimer un caractère
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Écriture du texte
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          // Pause avant de commencer la suppression
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Suppression du texte
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Passer au texte suivant et réinitialiser l'état
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100); // Vitesse différente pour suppression/écriture

    return () => clearTimeout(timeout); // Nettoyage du timer
  }, [displayText, isDeleting, currentIndex, texts]);

  return (
    <span className={className}>
      {displayText}
      {/* Curseur clignotant */}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypewriterText;
