"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Alert, Tourist } from "@/lib/data";
import { generateDummyFIR } from "@/ai/flows/generate-dummy-fir";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download } from "lucide-react";

interface GenerateFirDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  alert: Alert | null;
  tourist: Tourist | undefined;
}

export default function GenerateFirDialog({
  isOpen,
  setIsOpen,
  alert,
  tourist,
}: GenerateFirDialogProps) {
  const { toast } = useToast();
  const [firReport, setFirReport] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && alert && tourist && !firReport) {
      const generateReport = async () => {
        setIsLoading(true);
        try {
          const response = await generateDummyFIR({
            touristName: tourist.name,
            passportNumber: tourist.passport,
            aadhaarNumber: tourist.aadhaar,
            drivingLicense: tourist.drivingLicense,
            itinerary: tourist.itinerary,
            emergencyContactName: tourist.emergencyContact.name,
            emergencyContactNumber: tourist.emergencyContact.phone,
            lastKnownLocation: alert.location,
            timeLastSeen: alert.timestamp,
            dateOfReport: new Date().toISOString(),
          });
          setFirReport(response.firReport);
        } catch (error) {
          console.error("Failed to generate FIR:", error);
          toast({
            title: "Error",
            description: "Could not generate FIR report.",
            variant: "destructive",
          });
          setIsOpen(false);
        } finally {
          setIsLoading(false);
        }
      };
      generateReport();
    }
  }, [isOpen, alert, tourist, firReport, setIsOpen, toast]);

  useEffect(() => {
    if (!isOpen) {
      setFirReport(""); // Reset when dialog closes
    }
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(firReport);
    toast({ title: "Copied!", description: "FIR report copied to clipboard." });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px] z-[9999]">
        <DialogHeader>
          <DialogTitle>Generated First Information Report (FIR)</DialogTitle>
          <DialogDescription>
            This is an AI-generated preliminary report for{" "}
            <span className="font-bold">{tourist?.name}</span>. Review and use it
            to file an official report.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-20 w-full mt-4" />
            </div>
          ) : (
            <Textarea readOnly value={firReport} className="h-80 resize-none font-mono text-xs" />
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button onClick={handleCopy} disabled={isLoading || !firReport}>
            <Copy className="mr-2 h-4 w-4" /> Copy Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
