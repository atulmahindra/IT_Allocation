"use client";

import * as React from "react";
import { LAPTOP_DIRECTORY } from "../data/laptopDirectory";
import type { LaptopDirectoryFilters } from "../types";

const DEFAULT_FILTERS: LaptopDirectoryFilters = {
  search: "",
  department: "All",
  assetType: "All",
  status: "All",
};

const DEFAULT_PAGE_SIZE = 10;

export function useLaptopDirectory() {
  const [filters, setFilters] = React.useState<LaptopDirectoryFilters>(DEFAULT_FILTERS);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);

  const filtered = React.useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    return LAPTOP_DIRECTORY.filter((laptop) => {
      const matchesSearch =
        search.length === 0 ||
        laptop.assetId.toLowerCase().includes(search) ||
        laptop.model.toLowerCase().includes(search) ||
        (laptop.assignedTo ?? "").toLowerCase().includes(search);
      const matchesDepartment = filters.department === "All" || laptop.department === filters.department;
      const matchesAssetType = filters.assetType === "All" || laptop.assetType === filters.assetType;
      const matchesStatus = filters.status === "All" || laptop.status === filters.status;
      return matchesSearch && matchesDepartment && matchesAssetType && matchesStatus;
    });
  }, [filters]);

  const start = page * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  const updateFilters = React.useCallback((next: Partial<LaptopDirectoryFilters>) => {
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
    filters.assetType !== "All" ||
    filters.status !== "All";

  return {
    laptops: paged,
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
