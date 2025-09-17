
import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TouristDetailsSkeleton() {
  return (
     <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Skeleton className="h-6 w-32" />
            </div>
            <div className="flex-1 p-2">
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
            </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6" />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center gap-4">
                <Skeleton className="h-7 w-7" />
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-16 ml-auto" />
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-60" />
                    <Skeleton className="h-4 w-80 mt-2" />
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-20 w-20 rounded-full" />
                            <div>
                                <Skeleton className="h-8 w-48" />
                            </div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(9)].map((_, i) => (
                                <div key={i}>
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-6 w-32 mt-2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-4 w-72 mt-2" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}

