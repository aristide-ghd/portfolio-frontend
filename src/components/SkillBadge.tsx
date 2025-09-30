import { LucideIcon } from 'lucide-react';

interface SkillBadgeProps {
  icon: LucideIcon;
  name: string;
  category?: string;
}

const SkillBadge = ({ icon: Icon, name, category }: SkillBadgeProps) => {
  return (
    <div className="group flex items-center gap-3 px-4 py-3 bg-card rounded-lg border border-border hover-lift shadow-card">
      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
        <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm">{name}</p>
        {category && <p className="text-xs text-muted-foreground">{category}</p>}
      </div>
    </div>
  );
};

export default SkillBadge;
