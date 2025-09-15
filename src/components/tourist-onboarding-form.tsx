
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
import { BookUser, Plane, Phone, User, UserPlus, Fingerprint, IdCard } from "lucide-react";
import { Tourist } from "@/lib/data";
import { Skeleton } from "./ui/skeleton";
import { useData } from "@/app/context/data-context";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  passport: z.string().min(8, "Passport number seems too short.").max(12, "Passport number seems too long."),
  aadhaar: z.string().optional(),
  drivingLicense: z.string().optional(),
  itinerary: z.string().min(10, "Please provide a brief itinerary."),
  emergencyContactName: z.string().min(2, "Contact name must be at least 2 characters."),
  emergencyContactPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format."),
});

export function TouristOnboardingForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { addTourist } = useData();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      passport: "",
      aadhaar: "",
      drivingLicense: "",
      itinerary: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newTourist: Tourist = {
        id: `t${Date.now()}`,
        name: values.name,
        passport: values.passport,
        aadhaar: values.aadhaar,
        drivingLicense: values.drivingLicense,
        itinerary: values.itinerary,
        emergencyContact: {
            name: values.emergencyContactName,
            phone: values.emergencyContactPhone,
        },
        status: 'Safe',
        lastSeen: 'Just now',
        location: { lat: 26.1445, lng: 91.7362 }, 
        dateAdded: new Date().toISOString(),
        avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
    };

    addTourist(newTourist);
    
    toast({
      title: "Registration Successful",
      description: `${values.name} has been registered with Cypherx Shield.`,
    });
    
    router.push("/");
  }

  if (!isClient) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
             <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
            </div>
             <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-20 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    );
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            name="aadhaar"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Aadhaar Number</FormLabel>
                <FormControl>
                    <div className="relative">
                    <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="e.g. 1234 5678 9012" {...field} className="pl-9" />
                    </div>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="drivingLicense"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driving License</FormLabel>
              <FormControl>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="e.g. DL-1420110012345" {...field} className="pl-9" />
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
