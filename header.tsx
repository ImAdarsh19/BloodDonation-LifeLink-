import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Don't render header on mobile devices (using MobileNavbar instead)
  if (isMobile) return null;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-background border-b border-border shadow-md hidden lg:block">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto justify-between">
            <div className="cursor-pointer">
              <Link href="/">
                <Logo />
              </Link>
            </div>
            <button
              className="md:hidden p-2 text-primary"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <nav className={`w-full md:w-auto ${isMenuOpen ? "block" : "hidden md:block"}`}>
            <ul className="flex flex-col md:flex-row items-center md:justify-end space-y-2 md:space-y-0 space-x-0 md:space-x-1">
              <li>
                <Link href="/">
                  <div className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                    location === "/" 
                      ? "bg-primary text-white" 
                      : "bg-accent/30 text-foreground hover:bg-primary/20"
                  }`}>
                    Home
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/blood-availability">
                  <div className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                    location === "/blood-availability" 
                      ? "bg-primary text-white" 
                      : "bg-accent/30 text-foreground hover:bg-primary/20"
                  }`}>
                    Find Blood
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/blood-banks">
                  <div className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                    location === "/blood-banks" 
                      ? "bg-primary text-white" 
                      : "bg-accent/30 text-foreground hover:bg-primary/20"
                  }`}>
                    Blood Banks
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/donation-camps">
                  <div className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                    location === "/donation-camps" 
                      ? "bg-primary text-white" 
                      : "bg-accent/30 text-foreground hover:bg-primary/20"
                  }`}>
                    Donation Camps
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/education">
                  <div className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                    location === "/education" 
                      ? "bg-primary text-white" 
                      : "bg-accent/30 text-foreground hover:bg-primary/20"
                  }`}>
                    Learn
                  </div>
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link href="/register-camp">
                      <div className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                        location === "/register-camp" 
                          ? "bg-primary text-white" 
                          : "bg-accent/30 text-foreground hover:bg-primary/20"
                      }`}>
                        Register Camp
                      </div>
                    </Link>
                  </li>
                  <li className="md:ml-2">
                    <Button variant="outline" size="sm" onClick={handleLogout} className="bg-destructive/10 hover:bg-destructive/20 border-destructive/20">
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <li className="md:ml-2">
                  <Link href="/auth">
                    <Button variant="default" size="sm" className="animate-button">
                      Donate Now
                    </Button>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
