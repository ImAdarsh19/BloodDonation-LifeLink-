import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Clock, Heart, DollarSign, Coffee } from "lucide-react";
import { DONATION_STEPS } from "@/lib/constants";

const DonationSteps = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "clock":
        return <Clock className="h-6 w-6" />;
      case "heart":
        return <Heart className="h-6 w-6" />;
      case "dollar-sign":
        return <DollarSign className="h-6 w-6" />;
      case "coffee":
        return <Coffee className="h-6 w-6" />;
      default:
        return <Clock className="h-6 w-6" />;
    }
  };

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">How Donation Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DONATION_STEPS.map((step, index) => (
            <Card key={index} className="hover-card bg-card">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4 pulse-effect">
                  {getIcon(step.icon)}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/blood-banks">
            <Button className="animate-button bg-primary text-white hover:bg-primary/90">
              Find Nearest Blood Bank To Donate
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DonationSteps;
