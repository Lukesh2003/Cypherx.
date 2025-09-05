"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Bell,
  CheckCircle2,
  FileText,
  Languages,
  Map,
  MoreHorizontal,
  PlusCircle,
  Siren,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Alert, Tourist } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { detectAnomalousActivity } from "@/ai/flows/detect-anomalous-activity";
import { useToast } from "@/hooks/use-toast";
import GenerateFirDialog from "./generate-fir-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { translateText } from "@/ai/flows/translate-alerts-and-ui";

interface DashboardClientProps {
  initialAlerts: Alert[];
  initialTourists: Tourist[];
}

// A simple component to demonstrate translation
function TranslatedText({
  children,
  lang,
}: {
  children: string;
  lang: string;
}) {
  const [translated, setTranslated] = useState(children);

  React.useEffect(() => {
    if (lang === "en" || !children) {
      setTranslated(children);
      return;
    }

    let isCancelled = false;
    async function doTranslate() {
      try {
        const result = await translateText({ text: children, language: lang });
        if (!isCancelled) {
          setTranslated(result.translatedText);
        }
      } catch (e) {
        console.error("Translation failed", e);
        if (!isCancelled) {
          setTranslated(children); // Fallback to original text
        }
      }
    }

    doTranslate();

    return () => {
      isCancelled = true;
    };
  }, [children, lang]);

  return <>{translated}</>;
}

export default function DashboardClient({
  initialAlerts,
  initialTourists,
}: DashboardClientProps) {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [tourists, setTourists] = useState<Tourist[]>(initialTourists);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isFirDialogOpen, setIsFirDialogOpen] = useState(false);
  const [language, setLanguage] = useState("en");

  const activeAlertsCount = alerts.filter((a) => a.status === "Active").length;

  const handleSimulateAnomaly = async () => {
    setIsSimulating(true);
    try {
      const { isAnomalous, anomalyDescription } =
        await detectAnomalousActivity({
          locationHistory: [
            { latitude: 34.1, longitude: -118.3, timestamp: Date.now() - 10000 },
            { latitude: 34.1, longitude: -118.3, timestamp: Date.now() },
          ],
          activityThreshold: 0.1,
          timeThresholdSeconds: 300,
        });

      if (isAnomalous) {
        const newAlert: Alert = {
          id: `a${Date.now()}`,
          touristId: "t3",
          type: "Anomaly",
          description: anomalyDescription || "Unusual activity detected.",
          timestamp: new Date().toISOString(),
          location: "Near hiking trail B",
          status: "Active",
        };
        setAlerts((prev) => [newAlert, ...prev]);
        setTourists((prev) =>
          prev.map((t) =>
            t.id === "t3" ? { ...t, status: "Alert" } : t
          )
        );
        toast({
          title: "AI Alert: Anomaly Detected",
          description: anomalyDescription,
          variant: "destructive",
        });
      } else {
        toast({
          title: "AI Simulation",
          description: "No anomalous activity was detected.",
        });
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Simulation Failed",
        description: "Could not run anomaly detection simulation.",
        variant: "destructive",
      });
    } finally {
      setIsSimulating(false);
    }
  };

  const handleSimulateSOS = () => {
    const sosTourist = tourists.find(t => t.id === 't2');
    if (!sosTourist) return;

    const newAlert: Alert = {
        id: `a${Date.now()}`,
        touristId: 't2',
        type: 'SOS',
        description: 'Panic button activated by tourist.',
        timestamp: new Date().toISOString(),
        location: 'City Center Plaza',
        status: 'Active',
    };
    setAlerts(prev => [newAlert, ...prev]);
    setTourists(prev => prev.map(t => t.id === 't2' ? {...t, status: 'Alert'} : t));
    toast({
        title: 'SOS Alert!',
        description: `${sosTourist.name} has activated the panic button.`,
        variant: 'destructive',
    });
  }

  const handleGenerateFir = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsFirDialogOpen(true);
  };

  const getTouristById = (id: string) => tourists.find((t) => t.id === id);
  const getAvatar = (id: string) => getTouristById(id)?.avatar;

  const totalTourists = tourists.length;
  const resolvedIncidents = alerts.filter(a => a.status === 'Resolved').length;

  return (
    <div
      className="flex flex-1 items-start justify-center rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center w-full p-6">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 w-full">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <TranslatedText lang={language}>Total Tourists</TranslatedText>
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTourists}</div>
              <p className="text-xs text-muted-foreground">
                Currently registered in the system
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <TranslatedText lang={language}>Active Alerts</TranslatedText>
              </CardTitle>
              <Siren className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeAlertsCount}</div>
              <p className="text-xs text-muted-foreground">
                Incidents requiring immediate attention
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <TranslatedText lang={language}>Resolved Incidents</TranslatedText>
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resolvedIncidents}</div>
              <p className="text-xs text-muted-foreground">
                Cases closed in the last 7 days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <TranslatedText lang={language}>System Language</TranslatedText>
              </CardTitle>
              <Languages className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Select onValueChange={setLanguage} defaultValue={language}>
                <SelectTrigger>
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ta">Tamil</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="ml">Malayalam</SelectItem>
                  <SelectItem value="te">Telugu</SelectItem>
                  <SelectItem value="kn">Kannada</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 w-full mt-8">
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8 xl:col-span-2">
            <Card className="xl:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle><TranslatedText lang={language}>Real-Time Locations</TranslatedText></CardTitle>
                <CardDescription>
                  Live map of all registered tourists.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    <Image src="https://picsum.photos/1200/600" data-ai-hint="map satellite" alt="Map of tourist locations" layout="fill" objectFit="cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-4">
                        <p className="text-white/80 text-sm bg-black/50 px-3 py-1 rounded-full">Map placeholder: Real-time tracking would be shown here.</p>
                    </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle><TranslatedText lang={language}>Recent Tourists</TranslatedText></CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tourist</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Last Seen
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Registered On
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tourists.map((tourist) => (
                      <TableRow key={tourist.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={getAvatar(tourist.id)}
                                alt={tourist.name}
                              />
                              <AvatarFallback>
                                {tourist.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{tourist.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              tourist.status === "Safe"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            <TranslatedText lang={language}>{tourist.status}</TranslatedText>
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {tourist.lastSeen}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(tourist.dateAdded).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Contact</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="grid gap-2">
                <CardTitle><TranslatedText lang={language}>Alerts & Incidents</TranslatedText></CardTitle>
                <CardDescription>
                  Live feed of SOS and AI-detected anomalies.
                </CardDescription>
              </div>
               <div className="flex items-center gap-2 ml-auto">
                    <Button size="sm" variant="outline" onClick={handleSimulateSOS}>Simulate SOS</Button>
                    <Button size="sm" onClick={handleSimulateAnomaly} disabled={isSimulating}>
                        {isSimulating ? 'Simulating...' : 'Simulate Anomaly'}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="grid gap-8">
              {alerts.map((alert) => (
                <div className="flex items-start gap-4" key={alert.id}>
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage
                      src={getAvatar(alert.touristId)}
                      alt="Avatar"
                    />
                    <AvatarFallback>
                      {getTouristById(alert.touristId)?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1 flex-1">
                    <p className="text-sm font-medium leading-none">
                      {alert.type === "SOS" ? "SOS Signal" : "AI Anomaly"} from{" "}
                      {getTouristById(alert.touristId)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {alert.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(alert.timestamp).toLocaleString()} at {alert.location}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant={
                        alert.status === "Active" ? "destructive" : "secondary"
                      }
                    >
                      <TranslatedText lang={language}>{alert.status}</TranslatedText>
                    </Badge>
                    {alert.status === "Active" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGenerateFir(alert)}
                      >
                        <FileText className="mr-2 h-3 w-3" />
                        Generate FIR
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        {selectedAlert && (
          <GenerateFirDialog
            isOpen={isFirDialogOpen}
            setIsOpen={setIsFirDialogOpen}
            alert={selectedAlert}
            tourist={getTouristById(selectedAlert.touristId)}
          />
        )}
      </div>
    </div>
  );
}
