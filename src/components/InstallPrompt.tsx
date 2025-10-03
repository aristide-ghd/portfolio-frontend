/**
 * InstallPrompt.tsx
 *
 * Composant pour gérer l'installation PWA (Progressive Web App).
 *
 * Fonctionnalités :
 * - Écoute l'événement `beforeinstallprompt` du navigateur
 * - Affiche une bannière invitant l'utilisateur à installer l'application
 * - Permet de lancer l'installation ou de fermer la bannière
 */

import { useEffect, useState } from 'react';
import { Button } from './ui/button';

// Type personnalisé pour l'événement beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>; // Méthode pour afficher la popup d'installation
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>; // Résultat du choix de l'utilisateur
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false); // Contrôle la visibilité de la bannière

  // -------------------- EFFET POUR ÉCOUTER L'ÉVÉNEMENT --------------------
  useEffect(() => {
    function onBeforeInstallPrompt(e: Event) {
      e.preventDefault(); // Empêche le prompt par défaut du navigateur
      setDeferredPrompt(e as BeforeInstallPromptEvent); // Sauvegarde l'événement pour déclencher plus tard
      setVisible(true); // Affiche la bannière
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt as EventListener);

    // Nettoyage : suppression du listener à la destruction du composant
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt as EventListener);
    };
  }, []);

  // -------------------- FONCTION D'INSTALLATION --------------------
  const handleInstall = async () => {
    if (!deferredPrompt) return; // Aucun événement enregistré
    deferredPrompt.prompt(); // Affiche le prompt d'installation
    const choice = await deferredPrompt.userChoice; // Attente du choix de l'utilisateur
    setVisible(false); // Cache la bannière après l'action
    setDeferredPrompt(null); // Réinitialise l'état
  };

  // Ne rien afficher si la bannière n'est pas visible
  if (!visible) return null;

  // -------------------- RENDER --------------------
  return (
    <div className="fixed bottom-4 left-4 right-4 md:right-8 z-50">
      <div className="bg-card border border-border rounded-2xl p-3 shadow-elegant flex items-center justify-between">
        {/* Message informatif */}
        <div className="text-sm">Installer l'application pour une meilleure expérience</div>
        {/* Boutons Installer / Fermer */}
        <div className="ml-3 flex gap-2">
          <Button size="sm" onClick={handleInstall}>Installer</Button>
          <Button size="sm" variant="ghost" onClick={() => setVisible(false)}>Fermer</Button>
        </div>
      </div>
    </div>
  );
}

// Fin du composant InstallPrompt
