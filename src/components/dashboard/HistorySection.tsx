
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useOptimization, OptimizationResult, OptimizationGoal } from "@/contexts/OptimizationContext";

const HistorySection = () => {
  const { history } = useOptimization();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const goalLabels: Record<OptimizationGoal, string> = {
    cpc: "Cost per Click",
    cpa: "Cost per Acquisition",
    roas: "Return on Ad Spend",
    cr: "Conversion Rate"
  };

  if (history.length === 0) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Optimization History</CardTitle>
          <CardDescription>View your past optimization results</CardDescription>
        </CardHeader>
        <CardContent className="h-32 flex items-center justify-center text-gray-400">
          No optimization history available yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Optimization History</CardTitle>
        <CardDescription>View your past optimization results</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Optimization Goal</TableHead>
              <TableHead>Summary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{formatDate(item.date)}</TableCell>
                <TableCell>{goalLabels[item.goal]}</TableCell>
                <TableCell>{item.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HistorySection;
