
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOptimization } from "@/contexts/OptimizationContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ResultsSection = () => {
  const { currentResult, isOptimizing } = useOptimization();

  if (isOptimizing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Optimization in Progress</CardTitle>
          <CardDescription>Please wait while we process your request</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-8 bg-brand-blue rounded-full mb-4"></div>
            <p className="text-sm text-gray-500">Processing data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentResult) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Optimization Results</CardTitle>
          <CardDescription>
            Complete the form and start optimization to see results
          </CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center text-gray-400">
          No optimization data available yet
        </CardContent>
      </Card>
    );
  }

  const chartData = currentResult.metrics.map((metric) => ({
    name: metric.name,
    current: metric.current,
    optimized: metric.optimized,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optimization Results</CardTitle>
        <CardDescription>{currentResult.summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" fill="#8884d8" name="Current" />
                <Bar dataKey="optimized" fill="#82ca9d" name="Optimized" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Recommendations</h3>
            <ul className="list-disc pl-5 space-y-1">
              {currentResult.recommendations.map((rec, index) => (
                <li key={index} className="text-sm">{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsSection;
