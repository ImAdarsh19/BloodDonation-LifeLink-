import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import BloodComponentTabs from "@/components/blood/blood-component-tabs";
import BloodCompatibility from "@/components/home/blood-compatibility";

const LearnDonation = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 gradient-text">Learn About Donation</h2>
        <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          Understand the blood donation process, who can donate, and how your donation helps save lives.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
          <div className="w-full md:w-1/2 fade-in">
            <div className="rounded-lg overflow-hidden shadow-xl glow-effect">
              <svg
                className="w-full h-auto"
                viewBox="0 0 800 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="800" height="500" fill="#1e1e2e" />
                <path
                  d="M400 100 C 350 100, 300 200, 350 300 C 400 400, 450 400, 500 300 C 550 200, 500 100, 450 100 Z"
                  fill="#fecaca"
                />
                <path
                  d="M400 150 C 375 150, 350 200, 375 275 C 400 350, 425 350, 450 275 C 475 200, 450 150, 425 150 Z"
                  fill="#ef4444"
                />
                <text x="400" y="400" fontFamily="Arial" fontSize="24" textAnchor="middle" fill="#e2e8f0">
                  One Donation Can Save Up To Three Lives
                </text>
                <path
                  d="M150 150 L 250 150 L 250 175 L 150 175 Z"
                  fill="#ef4444"
                />
                <path
                  d="M150 200 L 230 200 L 230 225 L 150 225 Z"
                  fill="#ef4444"
                />
                <path
                  d="M550 150 L 650 150 L 650 175 L 550 175 Z"
                  fill="#ef4444"
                />
                <path
                  d="M570 200 L 650 200 L 650 225 L 570 225 Z"
                  fill="#ef4444"
                />
              </svg>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold mb-4 text-foreground">One Donation Can Save Up To Three Lives</h3>
            <div className="bg-card border-l-4 border-primary p-4 mb-6">
              <p className="text-muted-foreground italic">
                After donating blood, the body works to replenish the blood loss. This stimulates the production of new blood cells and in turn, helps in maintaining good health.
              </p>
            </div>
            <p className="text-foreground/80 mb-6">
              The average human body contains about five liters of blood, which is made of several cellular and non-cellular components such as <strong>Red blood cells</strong>, <strong>Platelets</strong>, and <strong>Plasma</strong>.
            </p>
            <p className="text-foreground/80 mb-6">
              Each type of component has its unique properties and can be used for different indications. The donated blood is separated into these components by the blood center and one donated unit can save up to four lives depending on the number of components separated from your blood.
            </p>
            <Link href="/auth">
              <Button className="animate-button bg-primary text-white hover:bg-primary/90">
                Donate Now
              </Button>
            </Link>
          </div>
        </div>

        <BloodCompatibility />
      </div>
    </section>
  );
};

export default LearnDonation;
