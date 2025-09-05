
"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Moon, Sun } from "lucide-react";

export function SettingsClient() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="grid max-w-2xl gap-8">
       <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-2">
                <Label>Theme</Label>
                <div className="flex gap-2">
                    <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')} className="flex-1">
                        <Sun className="mr-2 h-4 w-4" />
                        Light
                    </Button>
                     <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')} className="flex-1">
                        <Moon className="mr-2 h-4 w-4" />
                        Dark
                    </Button>
                </div>
            </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>AI Configuration</CardTitle>
          <CardDescription>
            Adjust the parameters for the AI anomaly detection system.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="anomaly-threshold">Anomaly Sensitivity</Label>
            <Select defaultValue="0.2">
              <SelectTrigger id="anomaly-threshold">
                <SelectValue placeholder="Select sensitivity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.1">High</SelectItem>
                <SelectItem value="0.2">Medium</SelectItem>
                <SelectItem value="0.3">Low</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              High sensitivity may result in more false positives.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time-threshold">Time Threshold (minutes)</Label>
            <Input id="time-threshold" type="number" defaultValue="10" />
            <p className="text-xs text-muted-foreground">
              The duration a tourist must be stationary or deviating before an
              alert is triggered.
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Configure how you receive alerts.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="notification-email">Alert Email Address</Label>
            <Input
              id="notification-email"
              type="email"
              placeholder="admin@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sms-number">SMS Alert Number</Label>
            <Input id="sms-number" type="tel" placeholder="+1-555-123-4567" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>System Language</CardTitle>
          <CardDescription>
            Set the default display language for the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select defaultValue="en">
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
      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  );
}
