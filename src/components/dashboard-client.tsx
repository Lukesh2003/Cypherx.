
"use client";

import React, { useState, createContext, useContext, useMemo, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCircle2,
  FileText,
  Languages,
  MoreHorizontal,
  Siren,
  Users,
  Map,
  Thermometer
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Alert, Tourist } from "@/lib/data";
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
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { translateTexts } from "@/ai/flows/translate-alerts-and-ui";
import { TooltipProvider } from "./ui/tooltip";
import { useData } from "@/app/context/data-context";
import { SafetyScoreCard } from "./safety-score-card";

// Dynamically import the LiveMap component with SSR disabled
const LiveMap = dynamic(() => import('./live-map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted flex items-center justify-center"><p>Loading map...</p></div>
});

const TranslationContext = createContext({
  language: 'en',
  getTranslation: (text: string) => text,
  setLanguage: (language: string) => {},
});

const useTranslation = () => useContext(TranslationContext);

function TranslatedText({ children }: { children: string }) {
  const { getTranslation } = useTranslation();
  return <>{getTranslation(children)}</>;
}

function TranslationProvider({ children }: { children: React.ReactNode }) {
    const { toast } = useToast();
    const [language, setLanguage] = useState('en');
    const [translations, setTranslations] = useState<Record<string, string>>({});
    const [isTranslating, setIsTranslating] = useState(false);
    const { alerts, tourists } = useData();

    const translationKeys = useMemo(() => {
      const keys = new Set<string>();
      keys.add("Total Tourists");
      keys.add("Active Alerts");
      keys.add("Resolved Incidents");
      keys.add("System Language");
      keys.add("Real-Time Locations");
      keys.add("Recent Tourists");
      keys.add("Alerts & Incidents");
      keys.add("High-Risk Zones")
      tourists.forEach(t => keys.add(t.status));
      alerts.forEach(a => keys.add(a.status));
      alerts.forEach(a => keys.add(a.type));
      return keys;
    }, [alerts, tourists]);

    useEffect(() => {
        let isCancelled = false;

        async function doTranslate() {
            if (language === 'en') {
                setTranslations({});
                return;
            }
            if (translationKeys.size === 0) return;

            setIsTranslating(true);
            
            const textsArray = Array.from(translationKeys);

            try {
                const result = await translateTexts({ texts: textsArray, language });
                if (!isCancelled) {
                    const newTranslations: Record<string, string> = {};
                    textsArray.forEach((text, index) => {
                        newTranslations[text] = result.translatedTexts[index];
                    });
                    setTranslations(newTranslations);
                }
            } catch (e) {
                console.error("Translation failed", e);
                toast({
                    title: 'Translation Error',
                    description: 'Could not translate the UI.',
                    variant: 'destructive',
                });
                if (!isCancelled) {
                    setTranslations({}); // Clear translations on error
                }
            } finally {
                if (!isCancelled) {
                    setIsTranslating(false);
                }
            }
        }

        doTranslate();

        return () => {
            isCancelled = true;
        };
    }, [language, toast, translationKeys]);


    const getTranslation = (text: string) => {
        if (!text) return '';
        if (language === 'en' || isTranslating) return text;
        return translations[text] || text;
    };

    const value = useMemo(() => ({
        language,
        setLanguage,
        getTranslation,
    }), [language, translations, isTranslating]);


    return (
        <TranslationContext.Provider value={value}>
            <TooltipProvider>
              {children}
            </TooltipProvider>
        </TranslationContext.Provider>
    );
}


export default function DashboardClient() {
  const { alerts, tourists } = useData();

  useEffect(() => {
    (async () => {
      const L = (await import('leaflet')).default;

      // Fix for default icon issue with Leaflet in some module bundlers
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      });
    })();
  }, []);

  return (
    <TranslationProvider>
      <DashboardContent />
    </TranslationProvider>
  )
}


function DashboardContent() {
  const { toast } = useToast();
  const { tourists, alerts, setAlerts, setTourists } = useData();
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isFirDialogOpen, setIsFirDialogOpen] = useState(false);
  const { language, setLanguage, getTranslation } = useTranslation();
  const [showHeatmap, setShowHeatmap] = useState(true);
  const router = useRouter();

  const activeAlertsCount = alerts.filter((a) => a.status === "Active").length;
  const averageSafetyScore = useMemo(() => {
    if (tourists.length === 0) return 0;
    const totalScore = tourists.reduce((acc, t) => acc + t.safeScore, 0);
    return Math.round(totalScore / tourists.length);
  }, [tourists]);

  const handleSimulateAnomaly = async () => {
    setIsSimulating(true);
    try {
      // Use a known tourist for the simulation
      const targetTourist = tourists[2]; // Ananya Reddy
      if (!targetTourist) {
        toast({ title: "Simulation Failed", description: "Not enough tourist data to run simulation."});
        return;
      }
      const { isAnomalous, anomalyDescription } =
        await detectAnomalousActivity({
          locationHistory: [
            { latitude: targetTourist.location.lat, longitude: targetTourist.location.lng, timestamp: Date.now() - 600000 },
            { latitude: targetTourist.location.lat + 0.05, longitude: targetTourist.location.lng + 0.05, timestamp: Date.now() - 300000 },
             { latitude: 34.1, longitude: -118.3, timestamp: Date.now() },
          ],
          activityThreshold: 0.1,
          timeThresholdSeconds: 300,
        });

      if (isAnomalous) {
        const newAlert: Alert = {
          id: `a${Date.now()}`,
          touristId: targetTourist.id,
          type: "Anomaly",
          description: anomalyDescription || "Unusual activity detected.",
          timestamp: new Date().toISOString(),
          location: "Near hiking trail B",
          status: "Active",
        };
        setAlerts((prev) => [newAlert, ...prev]);
        setTourists((prev) =>
          prev.map((t) =>
            t.id === targetTourist.id ? { ...t, status: "Alert" } : t
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
        timestamp: '2023-10-27T10:30:00Z',
        location: 'City Center Plaza',
        status: 'Active',
    };
    setAlerts(prev => [newAlert, ...prev]);
    setTourists(prev => prev.map(t => t.id === 't2' ? {...t, status: 'Alert'} : t));
    toast({
        title: 'SOS Alert!',
        description: `${getTranslation(sosTourist.name)} has activated the panic button.`,
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

  const handleViewDetails = (touristId: string) => {
    router.push(`/tourist/${touristId}`);
  };

  const handleContact = (tourist: Tourist) => {
    const email = tourist.emergencyContact.phone; // Assuming phone is email for now
    window.location.href = `mailto:${email}`;
  };

  return (
    <div
      className="flex flex-1 items-start justify-center rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center w-full p-6">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5 w-full">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <TranslatedText>Total Tourists</TranslatedText>
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
                <TranslatedText>Active Alerts</TranslatedText>
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
                <TranslatedText>Resolved Incidents</TranslatedText>
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
           <SafetyScoreCard
            score={averageSafetyScore}
            showHeatmap={showHeatmap}
            onHeatmapToggle={setShowHeatmap}
           />
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <TranslatedText>System Language</TranslatedText>
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
            <Card className="xl:col-span-2 bg-background">
              <CardHeader className="pb-3">
                <CardTitle><TranslatedText>Real-Time Locations</TranslatedText></CardTitle>
                <CardDescription>
                  Live map of all registered tourists.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] w-full">
                <LiveMap tourists={tourists} showHeatmap={showHeatmap} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle><TranslatedText>Recent Tourists</TranslatedText></CardTitle>
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
                            <TranslatedText>{tourist.status}</TranslatedText>
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {tourist.lastSeen}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(tourist.dateAdded).toISOString().split('T')[0]}
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
                              <DropdownMenuItem onClick={() => handleViewDetails(tourist.id)}>View Details</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleContact(tourist)}>Contact</DropdownMenuItem>
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
            <CardHeader className="flex flex-wrap items-center justify-between gap-4">
              <div className="grid gap-2">
                <CardTitle><TranslatedText>Alerts &amp; Incidents</TranslatedText></CardTitle>
                <CardDescription>
                  Live feed of SOS and AI-detected anomalies.
                </CardDescription>
              </div>
               <div className="flex flex-shrink-0 items-center gap-2">
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
                    <p className="text-sm font-medium leading-none break-words">
                      {getTranslation(alert.type) === 'SOS' ? "SOS Signal" : "AI Anomaly"} from{" "}
                      {getTouristById(alert.touristId)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground break-words">
                      {alert.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 break-words">
                      {new Date(alert.timestamp).toISOString().replace('T', ' ').substring(0, 19)}
                      {" "}
                      at {alert.location}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant={
                        alert.status === "Active" ? "destructive" : "secondary"
                      }
                    >
                      <TranslatedText>{alert.status}</TranslatedText>
                    </Badge>
                    {alert.status === "Active" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGenerateFir(alert)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
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
