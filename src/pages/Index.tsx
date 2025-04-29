
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { OptimizationProvider } from "@/contexts/OptimizationContext";

const Index = () => {
  const { user, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-10 bg-brand-blue rounded-full mb-4"></div>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Show login if not authenticated
  if (!user) {
    return <Login />;
  }
  
  // Show dashboard if authenticated
  return (
    <OptimizationProvider>
      <Dashboard />
    </OptimizationProvider>
  );
};

export default Index;
