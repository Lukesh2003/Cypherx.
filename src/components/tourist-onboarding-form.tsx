"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { BookUser, Plane, Phone, User, UserPlus } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  passport: z.string().min(8, "Passport number seems too short.").max(12, "Passport number seems too long."),
  itinerary: z.string().min(10, "Please provide a brief itinerary."),
  emergencyContactName: z.string().min(2, "Contact name must be at least 2 characters."),
  emergencyContactPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format."),
});

export function TouristOnboardingForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      passport: "",
      itinerary: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Registration Successful",
      description: `${values.name} has been registered with Cypherx Shield.`,
    });
    // Here you would typically send the data to your backend
    // For now, we'll just redirect to the dashboard
    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tourist Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="e.g. John Doe" {...field} className="pl-9" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passport Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <BookUser className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="e.g. A12345678" {...field} className="pl-9" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itinerary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brief Itinerary</FormLabel>
              <FormControl>
                <div className="relative">
                   <Plane className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                   <Textarea
                    placeholder="e.g. Hiking in the national park, then visiting the lake viewpoint."
                    {...field}
                    className="pl-9"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <div className="space-y-2">
            <h3 className="text-sm font-medium">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="emergencyContactName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                        <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="e.g. Jane Doe" {...field} className="pl-9" />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="emergencyContactPhone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                        <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="+1-555-123-4567" {...field} className="pl-9" />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
        </div>

        <Button type="submit" className="w-full">
          <UserPlus className="mr-2 h-4 w-4" />
          Register Tourist
        </Button>
      </form>
    </Form>
  );
}
