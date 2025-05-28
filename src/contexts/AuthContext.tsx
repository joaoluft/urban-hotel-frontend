
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';
import { login as loginRequest } from '@/services/api/login';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (identifier: string, password: string): Promise<boolean> => {
    try {
      const request = await loginRequest({
        identifier,
        password,
      })
  
      if (request?.token) {
        const user: User = {
          id: request.user_id,
          name: request.username,
          email: request.email,
          token: request.token,
        }
        setUser(user);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
