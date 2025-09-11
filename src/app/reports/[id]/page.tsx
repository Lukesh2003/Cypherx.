
import Link from 'next/link';
import {
  ArrowLeft,
  FileText,
  LayoutDashboard,
  Settings,
  UserPlus,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/icons';
import { MOCK_ALERTS, MOCK_TOURISTS } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function ReportDetailsPage({ params }: { params: { id: string } }) {
  const alert = MOCK_ALERTS.find(a => a.id === params.id);
  const tourist = MOCK_TOURISTS.find(t => t.id === alert?.touristId);

  if (!alert || !tourist) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        Report not found.
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Logo className="h-6 w-6" />
              <span className="">Cypherx Shield</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/onboarding"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <UserPlus className="h-4 w-4" />
                Onboarding
              </Link>
              <Link
                href="/reports"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <FileText className="h-4 w-4" />
                Reports
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
           <Link href="/reports" className="md:hidden">
              <Button variant="outline" size="icon" className="shrink-0">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back to Reports</span>
              </Button>
            </Link>
          <div className="w-full flex-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Users className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center gap-4">
                <Link href="/reports" className="hidden md:block">
                  <Button variant="outline" size="icon" className="h-7 w-7">
                      <ArrowLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                  </Button>
                </Link>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Incident Report: {alert.id.toUpperCase()}
                </h1>
                <Badge variant={alert.status === 'Active' ? 'destructive' : 'secondary'} className="ml-auto sm:ml-0">
                    {alert.status}
                </Badge>
           </div>
          <Card>
            <CardHeader>
              <CardTitle>Incident Details</CardTitle>
              <CardDescription>
                Details about the {alert.type} alert for {tourist.name}.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Type</p>
                            <p>{alert.type}</p>
                        </div>
                         <div>
                            <p className="text-sm font-medium text-muted-foreground">Date</p>
                            <p>{new Date(alert.timestamp).toISOString().replace('T', ' ').substring(0, 19)}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Location</p>
                            <p>{alert.location}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Status</p>
                            <p>{alert.status}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="grid gap-2">
                         <p className="text-sm font-medium text-muted-foreground">Description</p>
                         <p className="text-base">{alert.description}</p>
                    </div>
                    <Separator />
                     <div className="grid gap-4">
                        <h3 className="text-lg font-semibold">Tourist Information</h3>
                         <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={tourist.avatar} />
                                <AvatarFallback>{tourist.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{tourist.name}</p>
                                <p className="text-sm text-muted-foreground">Passport: {tourist.passport}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <p className="text-sm font-medium text-muted-foreground">Emergency Contact</p>
                                <p>{tourist.emergencyContact.name} ({tourist.emergencyContact.phone})</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Itinerary</p>
                                <p>{tourist.itinerary}</p>
                            </div>
                        </div>
                     </div>
                </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
