"use client";

import { useAuth } from '@/hooks/use-auth';
import {
  ShieldCheck,
  LogOut,
  UserCircle,
  Settings,
  Shield,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function DashboardHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold tracking-tight text-foreground font-headline">
          SamridhiWatch
        </h1>
      </div>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <UserCircle className="mr-2" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Settings className="mr-2" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Shield className="mr-2" />
                <div className="flex justify-between items-center w-full">
                    <span>Role</span>
                    <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
