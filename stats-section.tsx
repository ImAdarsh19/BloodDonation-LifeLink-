import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsProps {
  isLoading: boolean;
  stats: {
    donorsRegistered: number;
    bloodUnitsCollected: number;
    approvedCamps: number;
    livesSaved: number;
    lastUpdated: string;
  };
}

const StatsSection = ({ isLoading, stats }: StatsProps) => {
  // Format numbers with commas for better readability
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };
  
  // Format last updated date for display
  const formatLastUpdated = (dateString: string) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const statItems = [
    {
      value: stats.donorsRegistered,
      label: "Donors Registered",
      icon: "user-plus"
    },
    {
      value: stats.bloodUnitsCollected,
      label: "Blood Units Collected",
      icon: "droplet"
    },
    {
      value: stats.approvedCamps,
      label: "Approved Camps",
      icon: "tent"
    },
    {
      value: stats.livesSaved,
      label: "Lives Saved",
      icon: "heart"
    }
  ];
  
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((stat, index) => (
            <Card 
              key={index} 
              className="hover-card bg-card p-6 text-center"
            >
              {isLoading ? (
                <>
                  <Skeleton className="h-12 w-32 mx-auto mb-2" />
                  <Skeleton className="h-6 w-24 mx-auto" />
                </>
              ) : (
                <>
                  <h3 className="text-4xl font-bold gradient-text mb-2">
                    {formatNumber(stat.value)}
                  </h3>
                  <p className="text-foreground font-medium">{stat.label}</p>
                  {index === 0 && stats.lastUpdated && (
                    <div className="text-xs text-muted-foreground mt-2">
                      Last update: {formatLastUpdated(stats.lastUpdated)}
                    </div>
                  )}
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
