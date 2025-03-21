import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { INDIAN_STATES } from "@/lib/constants";
import { Phone, MapPin, Mail, ExternalLink } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface BloodBank {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string | null;
  latitude: string | null;
  longitude: string | null;
}

interface SearchFormValues {
  state: string;
  city: string;
}

const BloodBanks = () => {
  const [hasSearched, setHasSearched] = useState(false);

  const form = useForm<SearchFormValues>({
    defaultValues: {
      state: "",
      city: ""
    }
  });

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["/api/blood-banks"],
    enabled: false, // Don't run on mount
  });

  const handleSearch = async (formData: SearchFormValues) => {
    setHasSearched(true);
    
    const queryParams = new URLSearchParams();
    
    if (formData.state) {
      queryParams.append("state", formData.state);
    }
    
    if (formData.city) {
      queryParams.append("city", formData.city);
    }
    
    try {
      const response = await apiRequest("GET", `/api/blood-banks?${queryParams.toString()}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching blood banks:", error);
      throw error;
    }
  };

  const openGoogleMaps = (latitude: string, longitude: string) => {
    if (latitude && longitude) {
      window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Blood Bank Directory</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Blood Banks</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSearch)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">All States</SelectItem>
                          {INDIAN_STATES.map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  className="px-8"
                  disabled={isLoading || isFetching}
                >
                  Search
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {hasSearched && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data && data.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="p-6 text-center">
                    <p className="text-lg text-gray-600">No blood banks found matching your search criteria. Try adjusting your search parameters.</p>
                  </CardContent>
                </Card>
              ) : (
                data && data.map((bank: BloodBank) => (
                  <Card key={bank.id}>
                    <CardHeader>
                      <CardTitle>{bank.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="flex items-center text-sm text-gray-600">
                          <MapPin size={16} className="mr-2" />
                          {bank.address}, {bank.city}, {bank.state}
                        </p>
                        <p className="flex items-center text-sm text-gray-600">
                          <Phone size={16} className="mr-2" />
                          {bank.phone}
                        </p>
                        {bank.email && (
                          <p className="flex items-center text-sm text-gray-600">
                            <Mail size={16} className="mr-2" />
                            {bank.email}
                          </p>
                        )}
                      </div>
                      
                      {bank.latitude && bank.longitude && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-4"
                          onClick={() => openGoogleMaps(bank.latitude!, bank.longitude!)}
                        >
                          <ExternalLink size={16} className="mr-2" />
                          View on Map
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BloodBanks;
