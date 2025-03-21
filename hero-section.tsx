import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary/80 to-primary py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Donate Blood, <span className="gradient-text">Save Lives</span></h2>
            <p className="text-lg mb-6 text-white/90">
              Your donation can save up to three lives. Join thousands of donors and make a difference today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/auth">
                <Button className="animate-button bg-white text-primary hover:bg-white/90">
                  Become a Donor
                </Button>
              </Link>
              <Link href="/blood-availability">
                <Button variant="outline" className="animate-button border-white text-white hover:bg-white hover:text-primary">
                  Find Blood
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="rounded-lg shadow-xl overflow-hidden glow-effect bg-card">
              <svg
                className="w-full h-auto max-w-md"
                viewBox="0 0 800 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="800" height="500" fill="#1e1e2e" />
                <path
                  d="M400 150 C 400 100, 450 50, 450 150 C 450 250, 350 250, 350 150 C 350 50, 400 100, 400 150"
                  fill="#ef4444"
                  transform="scale(2) translate(-100, -15)"
                />
                <path
                  d="M425 175 C 450 120, 475 160, 450 200 C 425 240, 375 240, 350 200 C 325 160, 350 120, 375 175 C 385 150, 415 150, 425 175"
                  fill="#fb7185"
                  transform="translate(-25, 75)"
                />
                <path
                  d="M450 320 L 600 320 L 600 340 L 450 340 Z"
                  fill="#ef4444"
                />
                <path
                  d="M450 360 L 580 360 L 580 380 L 450 380 Z"
                  fill="#ef4444"
                />
                <path
                  d="M200 320 L 350 320 L 350 340 L 200 340 Z"
                  fill="#ef4444"
                />
                <path
                  d="M220 360 L 350 360 L 350 380 L 220 380 Z"
                  fill="#ef4444"
                />
                <circle cx="200" cy="250" r="15" fill="#ef4444" />
                <circle cx="240" cy="250" r="15" fill="#f87171" />
                <circle cx="280" cy="250" r="15" fill="#fca5a5" />
                <circle cx="600" cy="250" r="15" fill="#ef4444" />
                <circle cx="560" cy="250" r="15" fill="#f87171" />
                <circle cx="520" cy="250" r="15" fill="#fca5a5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
