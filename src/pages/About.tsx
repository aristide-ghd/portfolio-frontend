import { Code, Database, Server, Globe, Sparkles, Rocket, Heart, Target } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/Footer';
import SkillBadge from '@/components/SkillBadge';

const About = () => {
  const technicalSkills = [
    { icon: Code, name: 'JavaScript/TypeScript', category: 'Langages' },
    { icon: Globe, name: 'React/Next.js', category: 'Frontend' },
    { icon: Server, name: 'Node.js/Express', category: 'Backend' },
    { icon: Database, name: 'MySQL', category: 'Bases de données' },
    { icon: Database, name: 'MongoDB', category: 'Bases de données' },
    { icon: Rocket, name: 'REST API', category: 'API' },
  ];

  const softSkills = [
    { icon: Heart, name: 'Travail en équipe' },
    { icon: Target, name: 'Résolution de problèmes' },
    { icon: Sparkles, name: 'Communication efficace' },
    // { icon: Rocket, name: 'Gestion de projet' },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>À propos — Aristide GBOHAÏDA</title>
        <meta name="description" content="Parcours, compétences techniques et soft skills d'Aristide GBOHAÏDA." />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">À propos de moi</h1>
            <p className="text-xl text-muted-foreground">
              Développeur backend passionné, je conçois des solutions web performantes, sécurisées et évolutives.
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border">
              <h2 className="text-3xl font-bold mb-6">Mon parcours</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Passionné par le développement web depuis mes débuts, j'ai commencé à coder il y a
                  plus de 3 ans. Mon parcours m'a permis de travailler sur des projets variés, allant
                  de simples sites web à des applications web complexes.
                </p>
                <p>
                  Ma spécialisation en développement backend me permet de créer des architectures
                  robustes et scalables, tandis que mes compétences fullstack me donnent une vision
                  globale des projets. Je suis constamment à la recherche de nouvelles technologies et
                  de meilleures pratiques pour améliorer la qualité de mon travail.
                </p>
                <p>
                  Aujourd'hui, je me concentre sur la création de solutions innovantes qui répondent
                  aux besoins réels des utilisateurs tout en respectant les meilleures pratiques de
                  l'industrie. Mon objectif est de transformer chaque défi en une opportunité
                  d'apprentissage et de croissance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Compétences Techniques</h2>
              <p className="text-muted-foreground">
                Technologies et outils que je maîtrise pour créer des solutions performantes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {technicalSkills.map((skill) => (
                <SkillBadge key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Soft Skills */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Soft Skills</h2>
              <p className="text-muted-foreground">
                Qualités personnelles qui font la différence dans mes projets
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {softSkills.map((skill) => (
                <SkillBadge key={skill.name} icon={skill.icon} name={skill.name} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">En chiffres</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { value: '2+', label: 'Années d\'expérience', color: 'text-primary' },
                { value: '5+', label: 'Projets réalisés', color: 'text-secondary' },
                { value: '6+', label: 'Technologies', color: 'text-accent' },
                { value: '5+', label: 'Clients satisfaits', color: 'text-primary' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-card rounded-xl p-8 shadow-card border border-border hover-lift"
                >
                  <div className={`text-5xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
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

export default About;
