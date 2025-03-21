import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BLOOD_GROUPS, INDIAN_STATES } from "@/lib/constants";

const registerFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  bloodGroup: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

const RegisterForm = () => {
  const { registerMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      bloodGroup: "",
      address: "",
      city: "",
      state: "",
    },
  });

  const handleSubmit = (values: RegisterFormValues) => {
    registerMutation.mutate(values);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/90">Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your full name" 
                    {...field} 
                    className="border-primary/20 focus:border-primary/50 bg-background/80 hover:bg-background"
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/90">Username</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Choose a username" 
                    {...field} 
                    className="border-primary/20 focus:border-primary/50 bg-background/80 hover:bg-background"
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/90">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    {...field}
                    className="border-primary/20 focus:border-primary/50 bg-background/80 hover:bg-background"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-foreground/60 hover:text-foreground"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/90">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className="border-primary/20 focus:border-primary/50 bg-background/80 hover:bg-background"
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/90">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    {...field}
                    className="border-primary/20 focus:border-primary/50 bg-background/80 hover:bg-background"
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bloodGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/90">Blood Group (Optional)</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="border-primary/20 focus:ring-primary/30 bg-background/80 hover:bg-background">
                    <SelectValue placeholder="Select your blood group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BLOOD_GROUPS.map((group) => (
                    <SelectItem key={group} value={group} className="hover:bg-primary/10">
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/90">Address (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your address" 
                  {...field} 
                  className="border-primary/20 focus:border-primary/50 bg-background/80 hover:bg-background"
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/90">City (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your city" 
                    {...field} 
                    className="border-primary/20 focus:border-primary/50 bg-background/80 hover:bg-background"
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/90">State (Optional)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-primary/20 focus:ring-primary/30 bg-background/80 hover:bg-background">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {INDIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state} className="hover:bg-primary/10">
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all animate-button"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
