
'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  FileText,
  LayoutDashboard,
  Settings,
  UserPlus,
  Users,
} from 'lucide-react';
import { useParams } from 'next/navigation';

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
import { Logo } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useData } from '@/app/context/data-context';
import { Alert } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function TouristDetailsPage() {
    const params = useParams();
    const { id } = params;
    const { tourists, alerts } = useData();

    const tourist = tourists.find(t => t.id === id);
    const touristAlerts = alerts.filter(a => a.touristId === id);

    if (!tourist) {
        return (
        <div className="flex min-h-screen w-full items-center justify-center">
            Tourist not found.
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
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
           <Link href="/" className="md:hidden">
              <Button variant="outline" size="icon" className="shrink-0">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back to Dashboard</span>
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
                <Link href="/" className="hidden md:block">
                  <Button variant="outline" size="icon" className="h-7 w-7">
                      <ArrowLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                  </Button>
                </Link>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {tourist.name}
                </h1>
                <Badge variant={tourist.status === 'Safe' ? 'secondary' : 'destructive'} className="ml-auto sm:ml-0">
                    {tourist.status}
                </Badge>
           </div>
          <Card>
            <CardHeader>
              <CardTitle>Tourist Information</CardTitle>
              <CardDescription>
                Detailed information about the tourist.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                     <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={tourist.avatar} />
                            <AvatarFallback>{tourist.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-2xl">{tourist.name}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         <div>
                            <p className="text-sm font-medium text-muted-foreground">Passport Number</p>
                            <p>{tourist.passport}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Aadhaar Number</p>
                            <p>{tourist.aadhaar || 'N/A'}</p>
                        </div>
                         <div>
                            <p className="text-sm font-medium text-muted-foreground">Driving License</p>
                            <p>{tourist.drivingLicense || 'N/A'}</p>
                        </div>
                         <div>
                            <p className="text-sm font-medium text-muted-foreground">Emergency Contact</p>
                            <p>{tourist.emergencyContact.name} ({tourist.emergencyContact.phone})</p>
                        </div>
                        <div className="lg:col-span-2">
                            <p className="text-sm font-medium text-muted-foreground">Itinerary</p>
                            <p>{tourist.itinerary}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Last Known Location</p>
                            <p>{tourist.location.lat}, {tourist.location.lng}</p>
                        </div>
                         <div>
                            <p className="text-sm font-medium text-muted-foreground">Last Seen</p>
                            <p>{tourist.lastSeen}</p>
                        </div>
                         <div>
                            <p className="text-sm font-medium text-muted-foreground">Date Registered</p>
                            <p>{new Date(tourist.dateAdded).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Location Safety Score</p>
                            <p className="font-semibold text-lg">{tourist.safeScore}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle>Alert History</CardTitle>
                <CardDescription>A log of all alerts associated with this tourist.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {touristAlerts.length > 0 ? touristAlerts.map((alert: Alert) => (
                            <TableRow key={alert.id}>
                                <TableCell>{alert.type}</TableCell>
                                <TableCell>{alert.description}</TableCell>
                                <TableCell>{alert.location}</TableCell>
                                <TableCell>
                                    <Badge variant={alert.status === 'Active' ? 'destructive' : 'secondary'}>
                                        {alert.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{new Date(alert.timestamp).toISOString().replace('T', ' ').substring(0, 19)}</TableCell>
                                <TableCell>
                                    <Button asChild variant="outline" size="sm">
                                    <Link href={`/reports/${alert.id}`}>View Report</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">No alerts for this tourist.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                 </Table>
            </CardContent>
           </Card>
        </main>
      </div>
    </div>
  );
}
