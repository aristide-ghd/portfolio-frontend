/**
 * Timeline.tsx
 *
 * Composant pour afficher une timeline d'expériences ou d'éducation.
 *
 * Props :
 * - items : tableau d'objets TimelineItem contenant année, titre, organisation, description et logo optionnel
 * - type : type de timeline ('experience' ou 'education') — peut être utilisé pour styles ou filtres
 *
 * Fonctionnalités :
 * - Affiche une ligne verticale représentant la timeline
 * - Chaque item est affiché avec un "dot" (icône ou initiales de l'année)
 * - Chaque item contient le titre, l'organisation, l'année et une description
 * - Effets visuels : ombre, hover, arrondi
 */

interface TimelineItem {
  year: string;           // Année ou période
  title: string;          // Titre du poste ou du diplôme
  organization: string;   // Nom de l'entreprise ou école
  description: string;    // Description détaillée
  logo?: string;          // Logo optionnel
}

interface TimelineProps {
  items: TimelineItem[];  // Liste des éléments de la timeline
  type: 'experience' | 'education'; // Type de timeline
}

const Timeline = ({ items, type }: TimelineProps) => {
  return (
    <div className="relative -ml-2 md:ml-0">
      {/* Ligne verticale de la timeline */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

      {/* Items */}
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative flex gap-3 md:gap-6">
            {/* Dot représentant l'item */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-card border-4 border-primary shadow-elegant flex items-center justify-center">
                {item.logo ? (
                  // Affiche le logo si disponible
                  <img
                    src={item.logo}
                    alt={item.organization}
                    className="w-8 h-8 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  // Sinon, affiche les deux derniers chiffres de l'année
                  <span className="text-lg font-bold text-primary">{item.year.slice(-2)}</span>
                )}
              </div>
            </div>

            {/* Contenu de l'item */}
            <div className="flex-1 bg-card rounded-lg p-6 border border-border shadow-card hover-lift -ml-2 md:ml-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-primary font-medium">{item.organization}</p>
                </div>
                <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  {item.year}
                </span>
              </div>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
