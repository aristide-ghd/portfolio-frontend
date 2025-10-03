/**
 * ContactForm.tsx
 *
 * Composant de formulaire de contact utilisé sur la page Contact.
 * 
 * - Gère les champs : name, email, message
 * - Affiche un toast de confirmation après l'envoi
 * - Empêche l'envoi multiple grâce à `isSubmitting`
 * - Utilise les composants UI personnalisés : Input, Textarea, Button
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

const ContactForm = () => {
  const { toast } = useToast(); // Hook personnalisé pour afficher des notifications
  const [formData, setFormData] = useState({
    name: '',     // Nom complet
    email: '',    // Email de l'utilisateur
    message: '',  // Message à envoyer
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Indique si le formulaire est en cours d'envoi

  /**
   * handleSubmit
   *
   * Gestionnaire de l'envoi du formulaire
   * - Empêche le comportement par défaut
   * - Active le spinner via isSubmitting
   * - Simule un envoi asynchrone
   * - Affiche un toast de confirmation
   * - Réinitialise le formulaire
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (ex: envoi vers un backend)
    setTimeout(() => {
      toast({
        title: 'Message envoyé !',
        description: 'Je vous répondrai dans les plus brefs délais.',
      });

      // Réinitialisation des champs
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  /**
   * handleChange
   *
   * Met à jour l'état formData à chaque modification de champ
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // -------------------- RENDER --------------------
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Champ Nom complet */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nom complet
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      </div>

      {/* Champ Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
        />
      </div>

      {/* Champ Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Votre message..."
          rows={5}
          required
        />
      </div>

      {/* Bouton d'envoi */}
      <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full">
        <Send className="h-5 w-5" />
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
      </Button>
    </form>
  );
};

export default ContactForm;
