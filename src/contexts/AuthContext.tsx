
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);

  // Carrega a sessão do localStorage ao inicializar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erro ao carregar sessão:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

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
        // Salva a sessão no localStorage
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      throw error
    }
  };

  const logout = () => {
    setUser(null);
    // Remove a sessão do localStorage
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;

  // Mostra loading enquanto carrega a sessão
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
