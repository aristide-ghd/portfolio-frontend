/**
 * SkillBadge.tsx
 *
 * Composant pour afficher une compétence sous forme de badge.
 * 
 * Fonctionnalités :
 * - Affiche une icône représentative de la compétence
 * - Affiche le nom de la compétence
 * - Optionnel : affiche une catégorie de compétence
 * - Effet visuel au survol (hover) avec changement de couleur et élévation
 */

import { LucideIcon } from 'lucide-react';

interface SkillBadgeProps {
  icon: LucideIcon;        // Icône de la compétence (Lucide)
  name: string;             // Nom de la compétence
  category?: string;        // Catégorie optionnelle (ex: Backend, Frontend, Database)
}

const SkillBadge = ({ icon: Icon, name, category }: SkillBadgeProps) => {
  return (
    <div className="group flex items-center gap-3 px-4 py-3 bg-card rounded-lg border border-border hover-lift shadow-card">
      {/* Icône avec effet hover */}
      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
        <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
      </div>

      {/* Nom et catégorie */}
      <div className="flex-1">
        <p className="font-medium text-sm">{name}</p>
        {category && <p className="text-xs text-muted-foreground">{category}</p>}
      </div>
    </div>
  );
};

export default SkillBadge;
