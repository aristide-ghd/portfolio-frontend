import { Github, Linkedin, Mail, MessageCircle, MapPin, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'aristidegbohaida@gmail.com',
      href: 'mailto:aristidegbohaida@gmail.com',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '(+229) 01 97 46 01 40',
      href: 'tel:+2290197460140',
      color: 'bg-secondary/10 text-secondary',
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: 'Godomey, Abomey-Calavi, Bénin',
      href: 'https://www.google.com/maps/search/?api=1&query=Godomey%2C+Abomey-Calavi%2C+B%C3%A9nin',
      color: 'bg-accent/10 text-accent',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      username: 'github.com/aristide-ghd',
      href: 'https://github.com/aristide-ghd',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      username: 'linkedin.com/in/aristidegbohaïda',
      href: 'https://www.linkedin.com/in/aristidegbohaïda',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      username: '(+229) 01 97 46 01 40',
      href: 'https://wa.me/2290197460140',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 md:pt-32 pb-20 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contactez-moi</h1>
            <p className="text-xl text-muted-foreground">
              Toujours ouvert aux opportunités et collaborations
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {contactMethods.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  className="bg-card rounded-xl p-6 border border-border shadow-card hover-lift text-center"
                >
                  <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-1">{label}</h3>
                  <p className="text-sm text-muted-foreground">{value}</p>
                </a>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Envoyez-moi un message</h2>
                <p className="text-muted-foreground mb-8">
                  Remplissez le formulaire ci-dessous et je vous répondrai dans les plus brefs
                  délais.
                </p>
                <ContactForm />
              </div>

              {/* Social Links & Info */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Retrouvez-moi sur</h2>
                <p className="text-muted-foreground mb-8">
                  Connectez-vous avec moi sur les réseaux sociaux pour suivre mes projets et
                  actualités.
                </p>

                <div className="space-y-4 mb-8">
                  {socialLinks.map(({ icon: Icon, label, username, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover-lift shadow-card"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{label}</h3>
                        <p className="text-sm text-muted-foreground">{username}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="bg-card rounded-xl p-6 border border-border shadow-card">
                  <h3 className="font-semibold mb-4">Disponibilité</h3>
                  <p className="text-muted-foreground mb-4">
                    Je suis actuellement disponible pour des projets freelance et des opportunités
                    à temps plein.
                  </p>
                  <Button variant="hero" className="w-full" asChild>
                    <a href="/cv.pdf" download>
                      Télécharger mon CV
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Basé à Godomey, Abomey-Calavi (Bénin)</h2>
            <p className="text-muted-foreground mb-8">Disponible pour des projets sur place (Abomey-Calavi/Cotonou) ou en remote</p>
            <div className="bg-card rounded-xl p-6 border border-border shadow-card flex flex-col items-center justify-center gap-4">
              <MapPin className="h-12 w-12 text-primary" />
              <p className="text-foreground font-medium">Godomey, Abomey-Calavi, Bénin</p>
              <p className="text-sm text-muted-foreground">(+229) 01 97 46 01 40 • aristidegbohaida@gmail.com</p>
              <div>
                <Button asChild>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Godomey%2C+Abomey-Calavi%2C+B%C3%A9nin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ouvrir dans Google Maps
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
