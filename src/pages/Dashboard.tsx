
import React from "react";
import Header from "@/components/dashboard/Header";
import OptimizationForm from "@/components/dashboard/OptimizationForm";
import ResultsSection from "@/components/dashboard/ResultsSection";
import HistorySection from "@/components/dashboard/HistorySection";
import { ThemeToggle } from "@/components/ThemeToggle";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="relative">
        <Header />
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
      </div>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OptimizationForm />
          <ResultsSection />
        </div>
        <HistorySection />
      </div>
    </div>
  );
};

export default Dashboard;
