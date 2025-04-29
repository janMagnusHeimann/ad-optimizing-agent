
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOptimization, OptimizationGoal, DataSource } from "@/contexts/OptimizationContext";

const OptimizationForm = () => {
  const {
    currentRequest,
    setGoal,
    setProductDescription,
    setAdvertisingPlan,
    toggleDataSource,
    startOptimization,
    isOptimizing
  } = useOptimization();

  const goals = [
    { value: "cpc", label: "Cost per Click (CPC)" },
    { value: "cpa", label: "Cost per Acquisition (CPA)" },
    { value: "roas", label: "Return on Ad Spend (ROAS)" },
    { value: "cr", label: "Conversion Rate (CR)" },
  ];

  const dataSources = [
    { value: "google", label: "Google Ads API" },
    { value: "custom", label: "Custom Data" },
  ];

  const handleGoalChange = (value: string) => {
    setGoal(value as OptimizationGoal);
  };

  const handleDataSourceToggle = (source: DataSource) => {
    toggleDataSource(source);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startOptimization();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ad Campaign Optimization</CardTitle>
        <CardDescription>
          Configure your optimization parameters and start the process
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="goal">Optimization Goal</Label>
            <Select onValueChange={handleGoalChange} defaultValue={currentRequest.goal}>
              <SelectTrigger className="w-full" id="goal">
                <SelectValue placeholder="Select optimization goal" />
              </SelectTrigger>
              <SelectContent>
                {goals.map((goal) => (
                  <SelectItem key={goal.value} value={goal.value}>
                    {goal.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product">Product Description</Label>
            <Textarea
              id="product"
              placeholder="Describe your product or service"
              value={currentRequest.productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plan">Advertising Plan</Label>
            <Textarea
              id="plan"
              placeholder="Describe your current or planned advertising strategy"
              value={currentRequest.advertisingPlan}
              onChange={(e) => setAdvertisingPlan(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-3">
            <Label>Data Sources</Label>
            <div className="flex flex-col gap-2">
              {dataSources.map((source) => (
                <div key={source.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={source.value}
                    checked={currentRequest.dataSources.includes(source.value as DataSource)}
                    onCheckedChange={() => handleDataSourceToggle(source.value as DataSource)}
                  />
                  <Label htmlFor={source.value}>{source.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isOptimizing}>
            {isOptimizing ? "Optimizing..." : "Start Optimization"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OptimizationForm;
