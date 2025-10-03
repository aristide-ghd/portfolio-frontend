/**
 * ProjectCard.tsx
 *
 * Composant pour afficher les projets du portfolio.
 *
 * Fonctionnalités :
 * - Affiche l'image du projet avec effet hover
 * - Affiche le titre, description et tags
 * - Affiche des badges pour les projets "phare"
 * - Boutons d'accès au code GitHub et à la démo live
 * - Supporte la mise en avant (featured) en doublant la largeur sur desktop
 */

import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  title: string;           // Nom du projet
  description: string;     // Description courte du projet
  image: string;           // URL de l'image du projet
  tags: string[];          // Liste de tags associés
  githubUrl?: string;      // Lien vers le dépôt GitHub
  liveUrl?: string;        // Lien vers la version live
  featured?: boolean;      // Indique si le projet est "phare"
}

const ProjectCard = ({
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
  featured = false,
}: ProjectCardProps) => {
  return (
    <div
      className={`group bg-card rounded-lg overflow-hidden border border-border hover-lift shadow-card ${
        featured ? 'md:col-span-2' : '' // Double la largeur si projet "phare"
      }`}
    >
      {/* IMAGE DU PROJET */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center transition-smooth transform-gpu group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {/* Overlay d'effet hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-smooth" />
      </div>

      {/* CONTENU DU PROJET */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold">{title}</h3>
          {featured && (
            <Badge variant="secondary" className="ml-2">
              Projet Phare
            </Badge>
          )}
        </div>

        {/* Description avec limitation de lignes */}
        <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        {/* BOUTONS D'ACTION */}
        <div className="flex gap-2">
          {/* Lien vers GitHub */}
          {githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                Code
              </a>
            </Button>
          )}
          {/* Lien vers la démo live */}
          {liveUrl && (
            <Button variant="default" size="sm" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Démo
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
