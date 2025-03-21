import { useLocation, Link } from "wouter";
import { Home, Droplet, MapPin, GraduationCap, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import MobileMenu from "./mobile-menu";

/**
 * Bottom navigation component for mobile devices
 * Displays a fixed nav bar at the bottom of the screen on mobile
 */
export default function MobileBottomNav() {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Only show on mobile devices
  if (!isMobile) return null;

  // Navigation items with icons
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/blood-availability", label: "Find Blood", icon: Droplet },
    { href: "/blood-banks", label: "Blood Banks", icon: MapPin },
    { href: "/education", label: "Learn", icon: GraduationCap },
  ];
  
  return (
    <>
      <div className="h-16 block lg:hidden" /> {/* Spacer for content above the fixed nav */}
      
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-background border-t h-16 lg:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <div className="flex flex-col items-center justify-center flex-1 py-2">
                <div
                  className={cn(
                    "flex flex-col items-center justify-center w-full",
                    isActive && "text-primary"
                  )}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                  <span className="text-xs mt-1 font-medium">
                    {item.label}
                  </span>
                </div>
                {isActive && (
                  <div className="absolute top-0 w-1/5 h-0.5 bg-primary rounded-b-full transform translate-y-0.5" />
                )}
              </div>
            </Link>
          );
        })}
        
        <button 
          className="flex flex-col items-center justify-center flex-1 py-2"
          onClick={() => setMenuOpen(true)}
        >
          <div className="flex flex-col items-center justify-center w-full">
            <Menu size={22} strokeWidth={1.8} />
            <span className="text-xs mt-1 font-medium">More</span>
          </div>
        </button>
      </nav>
      
      {/* Mobile menu drawer */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}