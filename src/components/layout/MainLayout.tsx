import React from 'react';
import { User } from '@/types/user';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
  user: User;
  onSignOut?: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, user, onSignOut }) => {
  return (
    <div className="container mx-auto p-4 max-w-5xl">
      {/* Navbar */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-100 rounded-full shadow-sm" />
          <div>
            <span className="text-gray-500">Logged in as</span>{" "}
            <span className="text-indigo-600 font-medium">
              {user.name}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={onSignOut}
          className="text-gray-600 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Main Content */}
      {children}
    </div>
  );
};
