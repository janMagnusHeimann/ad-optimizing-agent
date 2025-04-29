
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

const Header = () => {
  const { user, logout } = useAuth();
  const { isDarkMode } = useTheme();

  return (
    <header className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4 transition-colors`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-brand-blue'}`}>Ad Insight Horizon</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Welcome, {user?.username || "User"}</span>
          <Button variant="outline" onClick={logout} className={isDarkMode ? 'border-gray-600 hover:bg-gray-800' : ''}>Sign Out</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
