import { ArrowRight, Download, Code, Palette, Zap, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import TypewriterText from '@/components/TypewriterText';
import SkillBadge from '@/components/SkillBadge';
import ProjectCard from '@/components/ProjectCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InstallPrompt from '@/components/InstallPrompt';
import heroImage from '@/assets/hero-bg.jpg';
import project1 from '@/assets/project1.jpg';
import imageTchat from '@/assets/imgTchat.png';
import project3 from '@/assets/project3.jpg';

const Index = () => {
  const roles = [
    'Développeur Backend',
    'Développeur Fullstack',
    'Passionné de Code',
  ];

  const skills = [
    { icon: Code, name: 'Node.js', category: 'Backend' },
    { icon: Palette, name: 'React', category: 'Frontend' },
    { icon: Zap, name: 'TypeScript', category: 'Langage' },
    { icon: Users, name: 'PostgreSQL', category: 'Base de données' },
  ];

  const featuredProjects = [
    {
      title: 'Dashboard Analytics',
      description:
        'Application web moderne pour la visualisation de données en temps réel avec graphiques interactifs et tableaux de bord personnalisables.',
      image: project1,
      tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      featured: true,
    },
    {
      title: 'TchatBox 💬',
      description:
        'Messagerie instantanée moderne et fluide ! Connectez-vous, discutez en temps réel avec vos amis, créez des conversations privées sécurisées. Interface élégante et responsive pour une expérience utilisateur optimale.',
      image: imageTchat,
      tags: ['Node.js', 'Express', 'Socket.IO', 'MongoDB'],
      githubUrl: 'https://github.com/aristide-ghd/TchatBox-Frontend',
      liveUrl: 'https://tchat-box-frontend.vercel.app/',
    },
    {
      title: 'API REST Microservices',
      description:
        'Architecture microservices scalable avec authentification JWT et documentation complète.',
      image: project3,
      tags: ['Node.js', 'Express', 'MongoDB', 'Docker'],
      githubUrl: 'https://github.com',
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Aristide GBOHAÏDA — Développeur Backend & Fullstack</title>
        <meta name="description" content="Développeur Backend & Fullstack. Découvrez mes projets, compétences et expériences." />
        <meta property="og:title" content="Aristide GBOHAÏDA — Développeur Backend & Fullstack" />
        <meta property="og:description" content="Portfolio professionnel: projets, compétences et expériences." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/image.jpeg" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Aristide GBOHAÏDA',
          jobTitle: 'Développeur Backend & Fullstack',
          url: '/',
          sameAs: [
            'https://github.com/aristide-ghd',
            'https://www.linkedin.com/in/aristidegbohaïda'
          ]
        })}</script>
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Hero" className="w-full h-full object-cover opacity-10" decoding="async" fetchPriority="high" />
          {/* Stronger overlay to ensure text readability on top of the hero image */}
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-primary p-1 shadow-elegant">
                <img src="/image.jpeg" alt="Portrait d'Aristide GBOHAÏDA" className="w-full h-full rounded-full object-cover" decoding="async" loading="lazy" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Bonjour, je suis{' '}
              <span className="text-gradient-primary">Aristide GBOHAÏDA</span>
            </h1>

            <div className="text-2xl md:text-3xl text-muted-foreground mb-4 h-12 flex items-center justify-center">
              <TypewriterText texts={roles} className="font-semibold" />
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200 mb-8 max-w-2xl mx-auto">
              Passionné par la création de solutions innovantes et performantes. Je transforme vos
              idées en applications web modernes et évolutives.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href="/cv.pdf" download>
                  <Download className="h-5 w-5" />
                  Télécharger CV
                </a>
              </Button>
              <Button variant="outline-hero" size="lg" asChild>
                <Link to="/projects">
                  Voir mes projets
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </div> */}
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '2+', label: 'Années d\'expérience' },
              { value: '5+', label: 'Projets réalisés' },
              { value: '6+', label: 'Technologies maîtrisées' },
              { value: '100%', label: 'Satisfaction client' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Compétences Clés</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technologies et outils que j'utilise pour créer des solutions performantes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {skills.map((skill) => (
              <SkillBadge key={skill.name} {...skill} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link to="/about">
                Voir toutes mes compétences
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projets Récents</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez une sélection de mes réalisations les plus récentes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="default" asChild>
              <Link to="/projects">
                Voir tous les projets
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-card rounded-2xl p-12 shadow-elegant border border-border">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Travaillons ensemble</h2>
            <p className="text-muted-foreground mb-8">
              Vous avez un projet en tête ? Je suis toujours ouvert aux nouvelles opportunités et
              collaborations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Me contacter</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/experience">Mon parcours</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

  <Footer />
  <InstallPrompt />
    </div>
  );
};

export default Index;
