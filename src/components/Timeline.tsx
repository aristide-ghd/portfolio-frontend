interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  description: string;
  logo?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  type: 'experience' | 'education';
}

const Timeline = ({ items, type }: TimelineProps) => {
  return (
    <div className="relative overflow-x-hidden">
      {/* Vertical Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

      {/* Items */}
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative flex gap-4">
            {/* Dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-card border-4 border-primary shadow-elegant flex items-center justify-center">
                {item.logo ? (
                  <img src={item.logo} alt={item.organization} className="w-8 h-8 object-contain" />
                ) : (
                  <span className="text-lg font-bold text-primary">{item.year.slice(-2)}</span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-card rounded-lg p-6 border border-border shadow-card hover-lift -ml-1 md:-ml-2 min-w-0 w-full">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-semibold break-words">{item.title}</h3>
                  <p className="text-primary font-medium break-words">{item.organization}</p>
                </div>
                <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full flex-shrink-0">
                  {item.year}
                </span>
              </div>
              <p className="text-muted-foreground break-words">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
