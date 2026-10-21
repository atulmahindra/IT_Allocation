"use client";

import * as React from "react";
import {
  getDashboardStats,
  getDepartmentBreakdown,
  getRecentEmployees,
  type DashboardStats,
  type DepartmentBreakdown,
} from "../services/dashboardService";
import type { Employee } from "@/features/employees/types";

export function useDashboard() {
  const [stats, setStats] = React.useState<DashboardStats | null>(null);
  const [departmentBreakdown, setDepartmentBreakdown] = React.useState<DepartmentBreakdown[]>([]);
  const [recentEmployees, setRecentEmployees] = React.useState<Employee[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;

    async function load() {
      const [statsResult, breakdownResult, recentResult] = await Promise.all([
        getDashboardStats(),
        getDepartmentBreakdown(),
        getRecentEmployees(5),
      ]);

      if (!isMounted) return;
      setStats(statsResult);
      setDepartmentBreakdown(breakdownResult);
      setRecentEmployees(recentResult);
      setIsLoading(false);
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return { stats, departmentBreakdown, recentEmployees, isLoading };
}
