
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/components/ui/sonner";

export type OptimizationGoal = "cpc" | "cpa" | "roas" | "cr";
export type DataSource = "google" | "custom";

export interface OptimizationRequest {
  goal: OptimizationGoal;
  productDescription: string;
  advertisingPlan: string;
  dataSources: DataSource[];
  date: string;
}

export interface OptimizationResult {
  id: string;
  goal: OptimizationGoal;
  date: string;
  summary: string;
  metrics: {
    name: string;
    current: number;
    optimized: number;
    improvement: number;
  }[];
  recommendations: string[];
}

interface OptimizationContextType {
  currentRequest: OptimizationRequest;
  setGoal: (goal: OptimizationGoal) => void;
  setProductDescription: (desc: string) => void;
  setAdvertisingPlan: (plan: string) => void;
  toggleDataSource: (source: DataSource) => void;
  startOptimization: () => Promise<void>;
  currentResult: OptimizationResult | null;
  history: OptimizationResult[];
  isOptimizing: boolean;
}

const defaultRequest: OptimizationRequest = {
  goal: "cpc",
  productDescription: "",
  advertisingPlan: "",
  dataSources: [],
  date: new Date().toISOString(),
};

const OptimizationContext = createContext<OptimizationContextType | undefined>(undefined);

export const useOptimization = () => {
  const context = useContext(OptimizationContext);
  if (!context) {
    throw new Error("useOptimization must be used within an OptimizationProvider");
  }
  return context;
};

// Mock data for demonstration purposes
const generateMockResult = (request: OptimizationRequest): OptimizationResult => {
  const goalMap: Record<OptimizationGoal, string> = {
    cpc: "Cost per Click",
    cpa: "Cost per Acquisition",
    roas: "Return on Ad Spend",
    cr: "Conversion Rate"
  };
  
  const metrics = [
    {
      name: goalMap[request.goal],
      current: Math.random() * 10 + 1,
      optimized: Math.random() * 5 + 1,
      improvement: Math.floor(Math.random() * 40) + 10
    },
    {
      name: "CTR",
      current: Math.random() * 5,
      optimized: Math.random() * 10,
      improvement: Math.floor(Math.random() * 40) + 10
    },
    {
      name: "Impressions",
      current: Math.floor(Math.random() * 10000),
      optimized: Math.floor(Math.random() * 20000),
      improvement: Math.floor(Math.random() * 40) + 10
    }
  ];

  const recommendations = [
    "Adjust bidding strategy to focus on high-converting keywords",
    "Optimize ad scheduling for peak engagement hours",
    "Refine targeting parameters to reach more qualified audiences",
    "Improve ad creative with more compelling call-to-actions"
  ];

  return {
    id: Math.random().toString(36).substring(2, 10),
    goal: request.goal,
    date: new Date().toISOString(),
    summary: `Optimization for ${goalMap[request.goal]} completed with an average improvement of ${Math.floor(Math.random() * 30) + 10}%`,
    metrics,
    recommendations
  };
};

interface OptimizationProviderProps {
  children: ReactNode;
}

export const OptimizationProvider: React.FC<OptimizationProviderProps> = ({ children }) => {
  const [currentRequest, setCurrentRequest] = useState<OptimizationRequest>(defaultRequest);
  const [currentResult, setCurrentResult] = useState<OptimizationResult | null>(null);
  const [history, setHistory] = useState<OptimizationResult[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const setGoal = (goal: OptimizationGoal) => {
    setCurrentRequest(prev => ({ ...prev, goal }));
  };

  const setProductDescription = (productDescription: string) => {
    setCurrentRequest(prev => ({ ...prev, productDescription }));
  };

  const setAdvertisingPlan = (advertisingPlan: string) => {
    setCurrentRequest(prev => ({ ...prev, advertisingPlan }));
  };

  const toggleDataSource = (source: DataSource) => {
    setCurrentRequest(prev => {
      const currentSources = [...prev.dataSources];
      const sourceIndex = currentSources.indexOf(source);
      
      if (sourceIndex >= 0) {
        currentSources.splice(sourceIndex, 1);
      } else {
        currentSources.push(source);
      }
      
      return { ...prev, dataSources: currentSources };
    });
  };

  const startOptimization = async () => {
    // Validate the request
    if (currentRequest.productDescription.trim() === "") {
      toast.error("Please provide a product description");
      return;
    }
    
    if (currentRequest.advertisingPlan.trim() === "") {
      toast.error("Please provide an advertising plan");
      return;
    }
    
    if (currentRequest.dataSources.length === 0) {
      toast.error("Please select at least one data source");
      return;
    }
    
    setIsOptimizing(true);
    
    try {
      // Simulate API call to backend
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Generate mock result for demonstration
      const result = generateMockResult(currentRequest);
      
      setCurrentResult(result);
      setHistory(prev => [result, ...prev]);
      toast.success("Optimization completed successfully!");
    } catch (error) {
      console.error("Optimization error:", error);
      toast.error("Optimization failed. Please try again.");
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <OptimizationContext.Provider value={{
      currentRequest,
      setGoal,
      setProductDescription,
      setAdvertisingPlan,
      toggleDataSource,
      startOptimization,
      currentResult,
      history,
      isOptimizing
    }}>
      {children}
    </OptimizationContext.Provider>
  );
};
