import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Hospital, Calendar, UserPlus, ClipboardList } from "lucide-react";
import { QUICK_ACTIONS } from "@/lib/constants";

const QuickActions = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "search":
        return <Search className="h-6 w-6" />;
      case "hospital":
        return <Hospital className="h-6 w-6" />;
      case "calendar":
        return <Calendar className="h-6 w-6" />;
      case "user-plus":
        return <UserPlus className="h-6 w-6" />;
      case "clipboard":
        return <ClipboardList className="h-6 w-6" />;
      default:
        return <Search className="h-6 w-6" />;
    }
  };

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 gradient-text">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUICK_ACTIONS.slice(0, 3).map((action, index) => (
            <Card key={index} className="hover-card overflow-hidden bg-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg mr-4 pulse-effect">
                    {getIcon(action.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{action.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{action.description}</p>
                <Link href={action.link}>
                  <a className="text-primary font-medium hover:text-primary/80 transition duration-300 flex items-center">
                    {action.title === "Blood Availability Search" ? "Search Now" : 
                     action.title === "Blood Bank Directory" ? "Find Blood Banks" : 
                     "View Camps"}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-2 animate-button" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </a>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {QUICK_ACTIONS.slice(3, 5).map((action, index) => (
            <Card key={index} className="hover-card overflow-hidden bg-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg mr-4 pulse-effect">
                    {getIcon(action.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{action.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{action.description}</p>
                <Link href={action.link}>
                  <a className="text-primary font-medium hover:text-primary/80 transition duration-300 flex items-center">
                    {action.title === "Donor Login / Registration" ? "Login / Register" : "Register Camp"}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-2 animate-button" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </a>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
