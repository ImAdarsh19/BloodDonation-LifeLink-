import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import BloodAvailability from "@/pages/blood-availability";
import BloodBanks from "@/pages/blood-banks";
import DonationCamps from "@/pages/donation-camps";
import Education from "@/pages/education";
import RegisterCamp from "@/pages/register-camp";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import MobileBottomNav from "./components/layout/mobile-bottom-nav";
import MobileNavbar from "./components/layout/mobile-navbar";
import { useEffect } from "react";

function Router() {
  // Add mobile viewport meta tag for proper scaling
  useEffect(() => {
    // Update viewport meta tag for better mobile display
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute(
        "content",
        "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
      );
    }
    
    // Add mobile detection class to body
    const handleResize = () => {
      if (window.innerWidth < 768) {
        document.body.classList.add("is-mobile");
      } else {
        document.body.classList.remove("is-mobile");
      }
    };
    
    // Initial check
    handleResize();
    
    // Listen for resize events
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Show standard header on desktop, mobile navbar on mobile */}
      <Header />
      <MobileNavbar />
      
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/blood-availability" component={BloodAvailability} />
          <Route path="/blood-banks" component={BloodBanks} />
          <Route path="/donation-camps" component={DonationCamps} />
          <Route path="/education" component={Education} />
          <ProtectedRoute path="/register-camp" component={RegisterCamp} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
