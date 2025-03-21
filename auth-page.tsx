import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import { Droplet, Heart, ShieldCheck, Users } from "lucide-react";

const AuthPage = () => {
  const { user, isLoading } = useAuth();

  // Redirect to home if already logged in
  if (!isLoading && user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Left column: Auth forms */}
          <div className="w-full max-w-md backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
              <span className="gradient-text">Welcome to LifeLink</span>
            </h1>
            <Card className="w-full border border-primary/20 shadow-xl">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                  <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Login</TabsTrigger>
                  <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <CardContent className="p-6">
                    <LoginForm />
                  </CardContent>
                </TabsContent>
                <TabsContent value="register">
                  <CardContent className="p-6">
                    <RegisterForm />
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Right column: Hero content */}
          <div className="w-full max-w-md bg-primary/90 text-primary-foreground rounded-lg p-8 shadow-[0_0_35px_rgba(220,38,38,0.3)] border border-primary/30 backdrop-blur-sm">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-background text-primary mb-4 shadow-md animate-pulse-slow">
                <Heart size={32} className="animate-heartbeat" />
              </div>
              <h2 className="text-2xl font-bold">Become a Blood Donor</h2>
            </div>
            <div className="space-y-6">
              <p className="text-primary-foreground/90">
                By donating blood, you can make a significant difference in the lives of others.
                A single donation can save up to three lives!
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/10 rounded-lg p-4 hover:bg-background/20 transition-all border border-background/10 hover:border-background/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Droplet className="h-5 w-5 text-red-300" />
                    <h3 className="font-semibold">Life-Saving</h3>
                  </div>
                  <p className="text-sm text-primary-foreground/80">Your donation directly saves lives in emergencies and surgeries</p>
                </div>
                
                <div className="bg-background/10 rounded-lg p-4 hover:bg-background/20 transition-all border border-background/10 hover:border-background/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-red-300" />
                    <h3 className="font-semibold">Health Check</h3>
                  </div>
                  <p className="text-sm text-primary-foreground/80">Free mini health check-up with every donation</p>
                </div>
                
                <div className="bg-background/10 rounded-lg p-4 hover:bg-background/20 transition-all border border-background/10 hover:border-background/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-red-300" />
                    <h3 className="font-semibold">Community</h3>
                  </div>
                  <p className="text-sm text-primary-foreground/80">Join a community of heroes who save lives regularly</p>
                </div>
                
                <div className="bg-background/10 rounded-lg p-4 hover:bg-background/20 transition-all border border-background/10 hover:border-background/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="h-5 w-5 text-red-300" />
                    <h3 className="font-semibold">Continuous Need</h3>
                  </div>
                  <p className="text-sm text-primary-foreground/80">Blood has a limited shelf life and is needed daily</p>
                </div>
              </div>

              <div className="bg-background/10 rounded-lg p-4 border border-background/30">
                <h3 className="font-bold mb-2">Did You Know?</h3>
                <ul className="space-y-2 text-primary-foreground/90">
                  <li className="flex items-start">
                    <span className="text-red-300 mr-2">•</span>
                    <span>Every 2 seconds someone needs blood</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-300 mr-2">•</span>
                    <span>A single car accident victim can require up to 100 units of blood</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
