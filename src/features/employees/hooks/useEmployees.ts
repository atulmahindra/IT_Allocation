"use client";

import * as React from "react";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../services/employeeService";
import type { Employee, EmployeeFilters, EmployeeInput } from "../types";

const DEFAULT_FILTERS: EmployeeFilters = {
  search: "",
  department: "All",
  status: "All",
};

const DEFAULT_PAGE_SIZE = 8;

export function useEmployees() {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [total, setTotal] = React.useState(0);
  const [filters, setFilters] = React.useState<EmployeeFilters>(DEFAULT_FILTERS);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchEmployees = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getEmployees({ ...filters, page, pageSize });
      setEmployees(result.data);
      setTotal(result.total);
    } catch {
      setError("Unable to load employees. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [filters, page, pageSize]);

  React.useEffect(() => {
    // Refetch whenever filters/pagination change; fetchEmployees sets loading state
    // synchronously before its first await, which is the intended request lifecycle.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEmployees();
  }, [fetchEmployees]);

  const updateFilters = React.useCallback((next: Partial<EmployeeFilters>) => {
    setFilters((prev) => ({ ...prev, ...next }));
    setPage(0);
  }, []);

  const changePage = React.useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const changePageSize = React.useCallback((nextSize: number) => {
    setPageSize(nextSize);
    setPage(0);
  }, []);

  const addEmployee = React.useCallback(
    async (input: EmployeeInput) => {
      await createEmployee(input);
      await fetchEmployees();
    },
    [fetchEmployees],
  );

  const editEmployee = React.useCallback(
    async (id: string, input: EmployeeInput) => {
      await updateEmployee(id, input);
      await fetchEmployees();
    },
    [fetchEmployees],
  );

  const removeEmployee = React.useCallback(
    async (id: string) => {
      await deleteEmployee(id);
      await fetchEmployees();
    },
    [fetchEmployees],
  );

  return {
    employees,
    total,
    filters,
    page,
    pageSize,
    isLoading,
    error,
    updateFilters,
    changePage,
    changePageSize,
    addEmployee,
    editEmployee,
    removeEmployee,
    refetch: fetchEmployees,
  };
}
