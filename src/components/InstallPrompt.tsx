import { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Empêche l'affichage automatique du navigateur
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Affiche notre notification personnalisée après 3 secondes
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Détecte si l'app est déjà installée
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Affiche la popup d'installation native
    deferredPrompt.prompt();
    
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('App installée');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Cache la notification pour cette session
    sessionStorage.setItem('installPromptDismissed', 'true');
  };

  // Ne pas afficher si déjà fermé dans cette session
  if (sessionStorage.getItem('installPromptDismissed') === 'true') {
    return null;
  }

  if (!showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-in slide-in-from-bottom-2 fade-in-50">
      <div className="bg-card border border-border rounded-2xl p-4 shadow-elegant backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-white" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold mb-1">
              Installer l'app Portfolio
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Accédez rapidement à mon portfolio depuis votre écran d'accueil !
            </p>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={handleInstallClick}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-1" />
                Installer
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleDismiss}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
