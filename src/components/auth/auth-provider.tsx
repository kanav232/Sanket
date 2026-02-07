"use client";

import React, { createContext, useState, useMemo } from 'react';
import type { User } from '@/lib/types';
import { mockUsers } from '@/lib/mock-data';

type AuthContextType = {
  user: User | null;
  login: (role: User['role']) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: User['role']) => {
    const userToLogin = mockUsers[role];
    if (userToLogin) {
      setUser(userToLogin);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
