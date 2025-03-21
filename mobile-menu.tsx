import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { Link } from "wouter";
import { X, LogIn, LogOut, UserPlus, User, LifeBuoy, Calendar, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/ui/logo";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Mobile slide-out menu
 * Provides additional navigation options and authentication controls
 */
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { user, logoutMutation } = useAuth();
  
  // Close menu when clicking outside and prevent body scrolling
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (open && target.closest(".mobile-menu-container") === null) {
        onClose();
      }
    };
    
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [open, onClose]);
  
  // Handle logout
  const handleLogout = () => {
    logoutMutation.mutate();
    onClose();
  };
  
  // Menu items for all users
  const menuItems = [
    { href: "/donation-camps", label: "Donation Camps", icon: Calendar },
    { href: "/register-camp", label: "Register Camp", icon: UserPlus },
    { href: "/education", label: "Learn About Donation", icon: LifeBuoy },
    { href: "/#contact", label: "Contact Us", icon: PhoneCall },
  ];
  
  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <div 
        className={cn(
          "absolute top-0 right-0 h-full w-3/4 max-w-xs bg-card shadow-xl border-l transition-transform duration-300 mobile-menu-container",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header with logo and close button */}
        <div className="flex items-center justify-between p-4 border-b">
          <Logo className="h-8 w-auto" textClassName="text-lg" showTagline={false} />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Main menu items */}
        <div className="flex flex-col p-4 gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={onClose}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-base font-normal px-2"
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
        
        <Separator className="my-2" />
        
        {/* Authentication section */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Account</h3>
          {user ? (
            <>
              <div className="flex items-center gap-3 p-3 mb-3 bg-muted rounded-lg">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {logoutMutation.isPending ? "Signing out..." : "Sign out"}
              </Button>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href="/auth" onClick={onClose}>
                <Button className="w-full justify-start">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign in
                </Button>
              </Link>
              <Link href="/auth" onClick={onClose}>
                <Button variant="outline" className="w-full justify-start">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}