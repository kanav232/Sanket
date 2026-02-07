import { LoginForm } from "@/components/auth/login-form";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                <ShieldCheck className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-primary font-headline">SamridhiWatch</h1>
            <p className="mt-2 text-muted-foreground">
                AI-Powered Public Safety Intelligence
            </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
