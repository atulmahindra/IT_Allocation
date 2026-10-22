"use client";

import * as React from "react";
import { LAPTOP_DIRECTORY } from "../data/laptopDirectory";
import type { LaptopDirectoryFilters } from "../types";

const DEFAULT_FILTERS: LaptopDirectoryFilters = {
  search: "",
  department: "All",
  vertical: "All",
  licenceType: "All",
  assetType: "All",
};

const DEFAULT_PAGE_SIZE = 10;

export function useLaptopDirectory() {
  const [filters, setFilters] = React.useState<LaptopDirectoryFilters>(DEFAULT_FILTERS);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);

  const filtered = React.useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    return LAPTOP_DIRECTORY.filter((item) => {
      const matchesSearch =
        search.length === 0 ||
        item.name.toLowerCase().includes(search) ||
        item.empId.toLowerCase().includes(search);
      const matchesDepartment = filters.department === "All" || item.department === filters.department;
      const matchesVertical = filters.vertical === "All" || item.vertical === filters.vertical;
      const matchesLicence = filters.licenceType === "All" || item.licenceType === filters.licenceType;
      const matchesAsset = filters.assetType === "All" || item.assetType === filters.assetType;
      return matchesSearch && matchesDepartment && matchesVertical && matchesLicence && matchesAsset;
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
    filters.vertical !== "All" ||
    filters.licenceType !== "All" ||
    filters.assetType !== "All";

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
