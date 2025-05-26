
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showHeader = true }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {showHeader && isAuthenticated && (
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white rounded-sm relative">
                    <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-1 left-1 w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">URBAN HOTEL</h1>
                </div>
              </Link>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <UserIcon size={20} />
                  <span className="font-medium">{user?.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <LogOut size={18} />
                </Button>
              </div>
            </div>
          </div>
        </header>
      )}
      
      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-white border-t py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Urban Hotel Team</p>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900">Suporte</a>
              <a href="#" className="hover:text-gray-900">Contato</a>
              <a href="#" className="hover:text-gray-900">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
