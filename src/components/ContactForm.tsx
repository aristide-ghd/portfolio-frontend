/**
 * ContactForm.tsx
 *
 * Formulaire de contact connecté au backend Express
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import axios from 'axios';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 🔹 Envoi vers ton backend (adapter l’URL si nécessaire)
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact/register_form`,
        formData
      );

      // 🔹 Affiche message succès
      toast({
        title: '✅ Message envoyé !',
        description: response.data?.message || 'Merci pour votre message, je vous répondrai vite.',
      });

      // 🔹 Reset du formulaire
      setFormData({ name: '', email: '', message: '' });
    } catch (error: unknown) {
      console.error(error);

    // Vérifie si c’est une erreur Axios
    if (axios.isAxiosError(error)) {
      toast({
        title: '❌ Échec de l’envoi',
        description:
          error.response?.data?.message ||
          'Une erreur est survenue. Veuillez réessayer plus tard.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: '❌ Erreur inconnue',
        description: 'Une erreur inattendue est survenue.',
        variant: 'destructive',
      });
    }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
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

      <Button
        type="submit"
        variant="hero"
        size="lg"
        disabled={isSubmitting}
        className="w-full flex items-center gap-2"
      >
        <Send className="h-5 w-5" />
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
      </Button>
    </form>
  );
};

export default ContactForm;
