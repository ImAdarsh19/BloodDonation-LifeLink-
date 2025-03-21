import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { INDIAN_STATES } from "@/lib/constants";
import { Loader2 } from "lucide-react";

// Define form schema
const campFormSchema = z.object({
  name: z.string().min(3, "Camp name must be at least 3 characters"),
  organizer: z.string().min(3, "Organizer name must be at least 3 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City name must be at least 2 characters"),
  state: z.string().min(2, "Please select a state"),
  date: z.string().refine((val) => {
    const selectedDate = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate > today;
  }, "Date must be in the future"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  contactPerson: z.string().min(3, "Contact person name must be at least 3 characters"),
  contactPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  contactEmail: z.string().email("Please enter a valid email").optional().or(z.literal("")),
});

type CampFormValues = z.infer<typeof campFormSchema>;

const RegisterCamp = () => {
  const { toast } = useToast();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  
  const form = useForm<CampFormValues>({
    resolver: zodResolver(campFormSchema),
    defaultValues: {
      name: "",
      organizer: "",
      address: "",
      city: "",
      state: "",
      date: "",
      startTime: "",
      endTime: "",
      contactPerson: "",
      contactPhone: "",
      contactEmail: "",
    },
  });
  
  const mutation = useMutation({
    mutationFn: async (values: CampFormValues) => {
      const response = await apiRequest("POST", "/api/donation-camps", values);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Camp Registered Successfully",
        description: "Your blood donation camp has been registered for approval.",
      });
      setSubmissionSuccess(true);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "There was an error registering your camp. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (values: CampFormValues) => {
    mutation.mutate(values);
  };
  
  const isLoading = form.formState.isSubmitting || mutation.isPending;
  
  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Register Blood Donation Camp</h1>
      
      {submissionSuccess ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Registration Successful</h2>
            <p className="text-gray-600 mb-6">
              Your blood donation camp has been registered and is pending approval. Our team will review your request and get in touch with you soon.
            </p>
            <Button onClick={() => setSubmissionSuccess(false)}>
              Register Another Camp
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Camp Registration Form</CardTitle>
            <CardDescription>
              Fill out the form below to register a blood donation camp. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Camp Details</h3>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Camp Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter camp name" {...field} />
                        </FormControl>
                        <FormDescription>
                          The official name of the blood donation camp
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="organizer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organizing Institution/Body *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter organizer name" {...field} />
                        </FormControl>
                        <FormDescription>
                          Name of the organization or institution hosting the camp
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Camp *</FormLabel>
                          <FormControl>
                            <Input type="date" min={today} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time *</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Time *</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Address Details</h3>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter venue address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State *</FormLabel>
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
                              {INDIAN_STATES.map((state) => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contact Details</h3>
                  
                  <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contact person name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone *</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Enter phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter email (optional)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button type="submit" className="px-8 py-2" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Register Camp"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RegisterCamp;
