/**
 * use-toast.ts
 *
 * Hook personnalisé pour gérer les notifications "toast" de manière centralisée.
 * Permet d'ajouter, mettre à jour, fermer et supprimer des toasts.
 */

import * as React from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

// --- Configuration ---
const TOAST_LIMIT = 1;              // Nombre maximal de toasts affichés simultanément
const TOAST_REMOVE_DELAY = 1000000; // Durée avant suppression automatique (ms)

// Type interne des toasts
type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// Définition des types d'action pour le reducer
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

// Génère un ID unique pour chaque toast
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

// Actions possibles pour le reducer
type Action =
  | { type: ActionType["ADD_TOAST"]; toast: ToasterToast }
  | { type: ActionType["UPDATE_TOAST"]; toast: Partial<ToasterToast> }
  | { type: ActionType["DISMISS_TOAST"]; toastId?: ToasterToast["id"] }
  | { type: ActionType["REMOVE_TOAST"]; toastId?: ToasterToast["id"] };

// État global des toasts
interface State {
  toasts: ToasterToast[];
}

// Map pour gérer les timers de suppression automatique
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

// Ajoute un toast à la file d'attente pour suppression automatique
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: "REMOVE_TOAST", toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

// Reducer pour gérer les actions sur les toasts
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      // Ajouter un toast en tête de liste et limiter le nombre
      return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) };

    case "UPDATE_TOAST":
      // Mettre à jour un toast existant par ID
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;
      // Planifie la suppression automatique
      if (toastId) addToRemoveQueue(toastId);
      else state.toasts.forEach((t) => addToRemoveQueue(t.id));

      // Fermer le toast (changer open à false)
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      };
    }

    case "REMOVE_TOAST":
      // Supprimer un toast de l'état
      if (action.toastId === undefined) return { ...state, toasts: [] };
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.toastId) };
  }
};

// --- État en mémoire et listeners ---
const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

// Dispatcher global pour mettre à jour l'état et notifier les listeners
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

// --- Fonction toast() pour créer un nouveau toast ---
type Toast = Omit<ToasterToast, "id">;

function toast(props: Toast) {
  const id = genId();
  const update = (props: ToasterToast) => dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  // Ajouter le toast avec callback pour fermer automatiquement
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return { id, dismiss, update };
}

// --- Hook useToast() pour utiliser le toaster dans un composant ---
function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, [state]);

  return {
    ...state,
    toast, // fonction pour créer un toast
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }), // fermer un toast existant
  };
}

export { useToast, toast };
