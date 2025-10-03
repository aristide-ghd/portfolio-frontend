/**
 * main.tsx
 *
 * Point d'entrée de l'application React.
 * - Monte le composant racine <App /> dans le DOM
 * - Enregistre le service worker en production
 */

import { createRoot } from "react-dom/client";
import App from "./App.tsx"; // Composant racine de l'application
import "./index.css"; // Styles globaux Tailwind / CSS

// Création de la racine React et rendu de l'application
createRoot(document.getElementById("root")!).render(<App />);

// === Service Worker (PWA) ===
// Enregistre le service worker uniquement en production pour ne pas polluer le dev
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js')
			.catch(() => {
				// Les erreurs d'enregistrement sont volontairement ignorées en production
				// pour éviter des logs inutiles
			});
	});
}
