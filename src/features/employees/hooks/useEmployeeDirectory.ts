"use client";

import * as React from "react";
import { EMPLOYEE_DIRECTORY } from "../data/employeeDirectory";
import type { EmployeeDirectoryFilters } from "../types";

const DEFAULT_FILTERS: EmployeeDirectoryFilters = {
  search: "",
  department: "All",
  vertical: "All",
  licenceType: "All",
};

const DEFAULT_PAGE_SIZE = 10;

export function useEmployeeDirectory() {
  const [filters, setFilters] = React.useState<EmployeeDirectoryFilters>(DEFAULT_FILTERS);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);

  const filtered = React.useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    return EMPLOYEE_DIRECTORY.filter((employee) => {
      const matchesSearch =
        search.length === 0 ||
        employee.name.toLowerCase().includes(search) ||
        employee.empId.toLowerCase().includes(search);
      const matchesDepartment = filters.department === "All" || employee.department === filters.department;
      const matchesVertical = filters.vertical === "All" || employee.vertical === filters.vertical;
      const matchesLicence = filters.licenceType === "All" || employee.licenceType === filters.licenceType;
      return matchesSearch && matchesDepartment && matchesVertical && matchesLicence;
    });
  }, [filters]);

  const start = page * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  const updateFilters = React.useCallback((next: Partial<EmployeeDirectoryFilters>) => {
    setFilters((prev) => ({ ...prev, ...next }));
    setPage(0);
  }, []);

  const clearFilters = React.useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(0);
  }, []);

  const changePage = React.useCallback((nextPage: number) => setPage(nextPage), []);

  const changePageSize = React.useCallback((nextSize: number) => {
    setPageSize(nextSize);
    setPage(0);
  }, []);

  const hasActiveFilters =
    filters.search.trim().length > 0 ||
    filters.department !== "All" ||
    filters.vertical !== "All" ||
    filters.licenceType !== "All";

  return {
    employees: paged,
    total: filtered.length,
    filters,
    page,
    pageSize,
    hasActiveFilters,
    updateFilters,
    clearFilters,
    changePage,
    changePageSize,
  };
}
