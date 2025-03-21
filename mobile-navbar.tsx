import { useIsMobile } from "@/hooks/use-mobile";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/hooks/use-auth";
import { User, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

/**
 * Mobile-specific top navbar
 * Shows logo and user action buttons optimized for small screens
 */
export default function MobileNavbar() {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  // Only render on mobile devices
  if (!isMobile) return null;
  
  return (
    <nav className="border-b py-3 px-4 bg-background sticky top-0 z-30 lg:hidden">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Logo className="h-8 w-auto" textClassName="text-lg" showTagline={false} />
        
        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" asChild>
            <Link href={user ? "/profile" : "/auth"}>
              <User className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}