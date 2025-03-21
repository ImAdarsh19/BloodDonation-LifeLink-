import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import BloodSearchForm from "@/components/blood/search-form";
import { BLOOD_GROUPS } from "@/lib/constants";
import { apiRequest } from "@/lib/queryClient";
import { Phone, MapPin, ExternalLink, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BloodDonorMap from "@/components/blood/blood-donor-map";

interface BloodInventoryWithBank {
  id: number;
  bloodBankId: number;
  bloodGroup: string;
  component: string;
  quantity: number;
  lastUpdated: string;
  bloodBank: {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    email: string | null;
    latitude: string | null;
    longitude: string | null;
  };
}

const BloodAvailability = () => {
  const [searchParams, setSearchParams] = useState<{
    bloodGroups: string[];
    state: string;
    city: string;
  }>({
    bloodGroups: [],
    state: "",
    city: "",
  });
  
  const [hasSearched, setHasSearched] = useState(false);
  
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["/api/blood-availability", searchParams],
    enabled: false, // Don't run the query on mount
  });
  
  const handleSearch = async (formData: {
    bloodGroups: string[];
    state: string;
    city: string;
  }) => {
    setSearchParams(formData);
    setHasSearched(true);
    
    // Build query params
    const queryParams = new URLSearchParams();
    
    formData.bloodGroups.forEach(group => {
      queryParams.append("bloodGroup", group);
    });
    
    if (formData.state) {
      queryParams.append("state", formData.state);
    }
    
    if (formData.city) {
      queryParams.append("city", formData.city);
    }
    
    try {
      const response = await apiRequest("GET", `/api/blood-availability?${queryParams.toString()}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching blood availability:", error);
      throw error;
    }
  };
  
  // Group results by blood bank
  const groupedResults = data ? 
    data.reduce((acc: Record<number, {
      bank: BloodInventoryWithBank["bloodBank"],
      inventory: BloodInventoryWithBank[]
    }>, item: BloodInventoryWithBank) => {
      if (!acc[item.bloodBankId]) {
        acc[item.bloodBankId] = {
          bank: item.bloodBank,
          inventory: []
        };
      }
      acc[item.bloodBankId].inventory.push(item);
      return acc;
    }, {}) : {};
  
  const openGoogleMaps = (latitude: string, longitude: string) => {
    if (latitude && longitude) {
      window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Blood Availability Search</h1>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <BloodSearchForm onSearch={handleSearch} />
        </CardContent>
      </Card>
      
      {hasSearched && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="w-full">
                  <CardContent className="p-4">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {BLOOD_GROUPS.slice(0, 4).map((_, j) => (
                        <Skeleton key={j} className="h-20 rounded-md" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {data && data.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-lg text-gray-600">No blood units found matching your search criteria. Try adjusting your search parameters.</p>
                  </CardContent>
                </Card>
              ) : (
                <Tabs defaultValue="list" className="mb-6">
                  <TabsList className="mb-4">
                    <TabsTrigger value="list" className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                      </svg>
                      List View
                    </TabsTrigger>
                    <TabsTrigger value="map" className="flex items-center gap-2">
                      <Map size={18} />
                      Map View
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="list" className="space-y-6">
                    {Object.values(groupedResults).map((group: any) => (
                      <Card key={group.bank.id} className="overflow-hidden">
                        <div className="border-b bg-gray-50 dark:bg-gray-800 p-4">
                          <h3 className="text-xl font-bold">{group.bank.name}</h3>
                          <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                            <p className="flex items-center mr-6 mb-2 md:mb-0">
                              <MapPin size={16} className="mr-1" />
                              {group.bank.address}, {group.bank.city}, {group.bank.state}
                            </p>
                            <p className="flex items-center">
                              <Phone size={16} className="mr-1" />
                              {group.bank.phone}
                            </p>
                            {group.bank.latitude && group.bank.longitude && (
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="ml-auto"
                                onClick={() => openGoogleMaps(group.bank.latitude!, group.bank.longitude!)}
                              >
                                <ExternalLink size={14} className="mr-1" />
                                View on Map
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <CardContent className="p-4">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {group.inventory.map((item: BloodInventoryWithBank) => (
                              <div 
                                key={item.id} 
                                className="border rounded-md p-3 text-center transition-colors hover:border-primary-500"
                              >
                                <p className="font-bold text-lg text-primary-600">{item.bloodGroup}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{item.component}</p>
                                <p className="text-xl font-bold mt-1">
                                  {item.quantity} {item.component === "Whole Blood" ? "units" : "units"}
                                </p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="map">
                    <Card>
                      <CardContent className="p-4">
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span className="font-semibold">Pro Tip:</span> Allow location access to see blood banks near you.
                          </p>
                        </div>
                        <BloodDonorMap data={data || []} isLoading={isLoading} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BloodAvailability;
