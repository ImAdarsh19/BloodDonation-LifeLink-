import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BLOOD_GROUPS, INDIAN_STATES } from "@/lib/constants";

const formSchema = z.object({
  bloodGroups: z.array(z.string()).min(1, "Please select at least one blood group"),
  state: z.string().optional(),
  city: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BloodSearchFormProps {
  onSearch?: (values: FormValues) => void;
}

const BloodSearchForm = ({ onSearch }: BloodSearchFormProps) => {
  const [selectedState, setSelectedState] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bloodGroups: [],
      state: "",
      city: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    if (onSearch) {
      onSearch(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select State</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedState(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {INDIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select District</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city/district" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bloodGroups"
          render={() => (
            <FormItem>
              <div className="mb-2">
                <FormLabel>Select Blood Group</FormLabel>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {BLOOD_GROUPS.map((group) => (
                  <FormField
                    key={group}
                    control={form.control}
                    name="bloodGroups"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={group}
                          className="flex items-center space-x-2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(group)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, group])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== group
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer">
                            {group}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-center">
          <Button
            type="submit"
            className="px-6 py-3 bg-primary-600 text-white font-bold rounded-md hover:bg-primary-700 transition duration-300"
          >
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BloodSearchForm;
