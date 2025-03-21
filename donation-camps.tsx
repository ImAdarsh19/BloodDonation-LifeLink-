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
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { INDIAN_STATES } from "@/lib/constants";
import { MapPin, Calendar, Clock, Phone, Mail } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

interface DonationCamp {
  id: number;
  name: string;
  organizer: string;
  address: string;
  city: string;
  state: string;
  date: string;
  startTime: string;
  endTime: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string | null;
  status: string;
}

interface SearchFormValues {
  state: string;
  city: string;
}

const DonationCamps = () => {
  const [hasSearched, setHasSearched] = useState(false);

  const form = useForm<SearchFormValues>({
    defaultValues: {
      state: "",
      city: ""
    }
  });

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["/api/donation-camps", { status: "approved" }],
    enabled: false, // Don't run on mount
  });

  const handleSearch = async (formData: SearchFormValues) => {
    setHasSearched(true);
    
    const queryParams = new URLSearchParams();
    queryParams.append("status", "approved");
    
    if (formData.state) {
      queryParams.append("state", formData.state);
    }
    
    if (formData.city) {
      queryParams.append("city", formData.city);
    }
    
    try {
      const response = await apiRequest("GET", `/api/donation-camps?${queryParams.toString()}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching donation camps:", error);
      throw error;
    }
  };

  // Sort camps by date (newest first)
  const sortedCamps = data ? 
    [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) : 
    [];

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Blood Donation Camps</h1>
      
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Search Upcoming Blood Donation Camps</CardTitle>
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
                
                <div className="flex justify-between items-center">
                  <Button 
                    type="submit" 
                    className="px-8"
                    disabled={isLoading || isFetching}
                  >
                    Search
                  </Button>
                  
                  <Link href="/register-camp">
                    <Button variant="outline">Register New Camp</Button>
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      
      {hasSearched && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Upcoming Donation Camps</h2>
          
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <div className="flex gap-4 mb-4">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-40" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {sortedCamps && sortedCamps.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-lg text-gray-600">No donation camps found matching your search criteria. Try adjusting your search parameters.</p>
                  </CardContent>
                </Card>
              ) : (
                sortedCamps.map((camp: DonationCamp) => (
                  <Card key={camp.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{camp.name}</CardTitle>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Approved
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar size={16} className="mr-2" />
                          <span className="font-medium">{formatDate(camp.date)}</span>
                          <span className="mx-2">•</span>
                          <Clock size={16} className="mr-2" />
                          <span>{camp.startTime} - {camp.endTime}</span>
                        </div>
                        
                        <p className="text-gray-700 font-medium">Organized by: {camp.organizer}</p>
                        
                        <div className="space-y-2">
                          <p className="flex items-center text-sm text-gray-600">
                            <MapPin size={16} className="mr-2" />
                            {camp.address}, {camp.city}, {camp.state}
                          </p>
                          
                          <p className="text-sm font-medium mt-4">Contact Details:</p>
                          <p className="text-sm text-gray-600">
                            {camp.contactPerson}
                          </p>
                          <p className="flex items-center text-sm text-gray-600">
                            <Phone size={16} className="mr-2" />
                            {camp.contactPhone}
                          </p>
                          {camp.contactEmail && (
                            <p className="flex items-center text-sm text-gray-600">
                              <Mail size={16} className="mr-2" />
                              {camp.contactEmail}
                            </p>
                          )}
                        </div>
                      </div>
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

export default DonationCamps;
