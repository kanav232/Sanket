"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { KeyRound, Shield, User } from 'lucide-react';

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (role: 'admin' | 'authority' | 'viewer') => {
    login(role);
    router.push('/');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select a Role to Sign In</CardTitle>
        <CardDescription>
          Choose a role to experience the dashboard's capabilities.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={() => handleLogin('admin')}
          className="w-full"
          variant="secondary"
        >
          <KeyRound />
          Sign In as Administrator
        </Button>
        <Button onClick={() => handleLogin('authority')} className="w-full">
          <Shield />
          Sign In as Authority User
        </Button>
        <Button
          onClick={() => handleLogin('viewer')}
          className="w-full"
          variant="outline"
        >
          <User />
          Sign In as Read-Only Viewer
        </Button>
      </CardContent>
    </Card>
  );
}
