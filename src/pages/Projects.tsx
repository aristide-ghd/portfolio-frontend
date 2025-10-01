import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import project1 from '@/assets/project1.jpg';
import project2 from '@/assets/project2.jpg';
import project3 from '@/assets/project3.jpg';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filters = ['Tous', 'Frontend', 'Backend', 'Fullstack', 'Mobile'];

  const projects = [
    {
      title: 'Dashboard Analytics',
      description:
        'Application web moderne pour la visualisation de données en temps réel avec graphiques interactifs et tableaux de bord personnalisables. Intègre des fonctionnalités avancées de filtrage et d\'export de données.',
      image: project1,
      tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      category: 'Fullstack',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      featured: true,
    },
    {
      title: 'E-Commerce Mobile',
      description:
        'Application mobile de commerce électronique complète avec panier d\'achat, paiements sécurisés via Stripe, notifications push et suivi des commandes en temps réel.',
      image: project2,
      tags: ['React Native', 'Firebase', 'Stripe', 'Redux'],
      category: 'Mobile',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      title: 'API REST Microservices',
      description:
        'Architecture microservices scalable avec authentification JWT, rate limiting, documentation Swagger complète et tests unitaires/intégration.',
      image: project3,
      tags: ['Node.js', 'Express', 'MongoDB', 'Docker'],
      category: 'Backend',
      githubUrl: 'https://github.com',
    },
    {
      title: 'Portfolio Website',
      description:
        'Site portfolio moderne et responsive avec animations fluides, design épuré et optimisation SEO pour une excellente visibilité en ligne.',
      image: project1,
      tags: ['Next.js', 'TailwindCSS', 'Framer Motion'],
      category: 'Frontend',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      title: 'Task Management App',
      description:
        'Application de gestion de tâches collaborative avec système de drag & drop, notifications en temps réel et synchronisation multi-appareils.',
      image: project2,
      tags: ['Vue.js', 'Firebase', 'Vuex', 'TypeScript'],
      category: 'Fullstack',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      title: 'Weather App',
      description:
        'Application météo élégante avec prévisions sur 7 jours, cartes interactives, alertes météo et géolocalisation automatique.',
      image: project3,
      tags: ['React', 'OpenWeather API', 'Mapbox'],
      category: 'Frontend',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
  ];

  const filteredProjects =
    activeFilter === 'Tous'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Projets — Aristide GBOHAÏDA</title>
        <meta name="description" content="Sélection de projets: fullstack, frontend, backend et mobile." />
        <meta property="og:image" content="/image.jpeg" />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Mes Projets</h1>
            <p className="text-xl text-muted-foreground">
              Découvrez une sélection de mes réalisations récentes et projets personnels
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-2 sm:px-4 lg:px-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Aucun projet trouvé pour cette catégorie.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
