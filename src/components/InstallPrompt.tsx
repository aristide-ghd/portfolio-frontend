import { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt as EventListener);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setVisible(false);
    setDeferredPrompt(null);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:right-8 z-50">
      <div className="bg-card border border-border rounded-2xl p-3 shadow-elegant flex items-center justify-between">
        <div className="text-sm">Installer l'application pour une meilleure expérience</div>
        <div className="ml-3 flex gap-2">
          <Button size="sm" onClick={handleInstall}>Installer</Button>
          <Button size="sm" variant="ghost" onClick={() => setVisible(false)}>Fermer</Button>
        </div>
      </div>
    </div>
  );
}
// end of InstallPrompt component
