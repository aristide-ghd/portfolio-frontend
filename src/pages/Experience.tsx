import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Timeline from '@/components/Timeline';
import { Helmet } from 'react-helmet-async';

const Experience = () => {
  const experiences = [
    {
      year: 'Avr. – Juil. 2025',
      title: 'Développeur Backend — Suivi Rénal (Projet de soutenance)',
      organization: 'Node.js / Express / MongoDB',
      description:
        "Backend complet: gestion des utilisateurs et rôles, API RESTful (patients, consultations, traitements, rendez-vous, dossiers médicaux), authentification JWT, validation (Yup), documentation Swagger, intégrations Nodemailer et permissions avancées.",
    },
    {
      year: 'Juil. – Août 2025',
      title: 'Développeur Backend — TchatBox (Projet personnel)',
      organization: 'Node.js / Express / Socket.IO / MongoDB',
      description:
        "Messagerie instantanée: authentification JWT, discussions privées, Socket.IO temps réel, interface responsive (Bootstrap).",
    },
    {
      year: 'Août 2024',
      title: 'Stagiaire Backend — Appli Client',
      organization: 'RightCom',
      description:
        "Développement backend Node.js/Express: API RESTful et base de données clients.",
    },
    {
      year: 'Juil. – Août 2024',
      title: 'Stagiaire Backend — Pedigree',
      organization: 'RightCom',
      description:
        "API RESTful pour la gestion des membres familiaux avec Node.js/Express.",
    },
    {
      year: '2024 – 2025',
      title: 'Développeur PHP — HomeChipsLaure (Projet client)',
      organization: 'PHP',
      description:
        "Application web pour la gestion des ventes, dépenses et recettes; tableaux de bord et validation des données.",
    },
  ];

  const education = [
    {
      year: '2021 – présent',
      title: 'Autoformation — Développement Web',
      organization: 'OpenClassrooms',
      description:
        "Apprentissage continu: JS/Node.js, API RESTful, sécurité, bonnes pratiques.",
    },
    {
      year: '2024 – 2025',
      title: 'Licence 3 — Systèmes Informatiques et Logiciels',
      organization: 'HECM, Cotonou',
      description:
        "Parcours orienté Systèmes Informatiques et Logiciels.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <Helmet>
        <title>Expérience — Aristide GBOHAÏDA</title>
        <meta name="description" content="Expériences professionnelles et formation d'Aristide GBOHAÏDA." />
        <meta property="og:image" content="/image.jpeg" />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Mon Parcours</h1>
            <p className="text-xl text-muted-foreground">
              Expérience professionnelle et formation académique
            </p>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Expérience Professionnelle</h2>
              <p className="text-muted-foreground">
                Mon parcours professionnel et les entreprises avec lesquelles j'ai travaillé
              </p>
            </div>

            <Timeline items={experiences} type="experience" />
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Formation</h2>
              <p className="text-muted-foreground">
                Mon parcours académique et mes certifications
              </p>
            </div>

            <Timeline items={education} type="education" />
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications</h2>
              <p className="text-muted-foreground">
                Formations et certifications professionnelles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'AWS Certified Developer',
                  organization: 'Amazon Web Services',
                  year: '2023',
                },
                {
                  title: 'Professional Scrum Master',
                  organization: 'Scrum.org',
                  year: '2022',
                },
                {
                  title: 'MongoDB Certified Developer',
                  organization: 'MongoDB University',
                  year: '2022',
                },
                {
                  title: 'React Advanced Certification',
                  organization: 'Meta',
                  year: '2021',
                },
              ].map((cert, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-6 border border-border shadow-card hover-lift"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold">{cert.title}</h3>
                    <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {cert.year}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{cert.organization}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Experience;
