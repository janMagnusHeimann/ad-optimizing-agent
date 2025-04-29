
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-brand-blue">Ad Insight Horizon</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Welcome, {user?.username || "User"}</span>
          <Button variant="outline" onClick={logout}>Sign Out</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
