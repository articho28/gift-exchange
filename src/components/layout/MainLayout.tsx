import React from 'react';
import { User } from '@/types/user';

interface MainLayoutProps {
  children: React.ReactNode;
  user: User;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, user }) => {
  return (
    <div className="container mx-auto p-4 max-w-5xl">
      {/* Navbar */}
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-gray-100 rounded-full shadow-sm" />
        <div>
          <span className="text-gray-500">Logged in as</span>{" "}
          <span className="text-indigo-600 font-medium">
            {user.name}
          </span>
        </div>
      </div>

      {/* Main Content */}
      {children}
    </div>
  );
};
