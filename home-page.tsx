import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/home/hero-section";
import StatsSection from "@/components/home/stats-section";
import QuickActions from "@/components/home/quick-actions";
import LearnDonation from "@/components/home/learn-donation";
import DonationSteps from "@/components/home/donation-steps";
import BloodSearchForm from "@/components/blood/search-form";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
  // Fetch statistics
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/statistics"],
  });

  return (
    <div>
      <HeroSection />
      
      <StatsSection 
        isLoading={isLoading}
        stats={stats || {
          donorsRegistered: 0,
          bloodUnitsCollected: 0,
          approvedCamps: 0,
          livesSaved: 0,
          lastUpdated: ""
        }}
      />
      
      <QuickActions />
      
      <LearnDonation />
      
      <DonationSteps />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center mb-6">Search Blood Availability</h2>
              <BloodSearchForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
