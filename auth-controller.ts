import { Request, Response } from 'express';
import { User } from '@/lib/types';

export const login = (req: Request, res: Response) => {
  const { role } = req.body;

  // Mock user generation based on role
  const mockUser: User = {
    name: role === 'admin' ? 'Admin User' : role === 'authority' ? 'Authority User' : 'Read-Only Viewer',
    email: `${role}@samridhi.watch`,
    role: role as User['role'],
    avatar: `https://i.pravatar.cc/150?u=${role}`,
  };

  // In a real app, we would generate a JWT here
  const token = 'mock-jwt-token';

  res.status(200).json({ user: mockUser, token });
};