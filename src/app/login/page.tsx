import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { Logo } from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4">
       <div className="mb-8 text-center">
        <Link href="/" className="flex items-center justify-center gap-2 font-semibold text-2xl">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-foreground">Cypherx Shield</span>
        </Link>
        <p className="text-muted-foreground mt-2">Enhanced Safety for Tourists</p>
       </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Official Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
