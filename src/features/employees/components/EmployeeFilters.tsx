"use client";

import * as React from "react";
import {
  Box,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { DEPARTMENT_OPTIONS } from "../data/mockEmployees";
import type { EmployeeFilters as EmployeeFiltersType } from "../types";

interface EmployeeFiltersProps {
  filters: EmployeeFiltersType;
  onChange: (next: Partial<EmployeeFiltersType>) => void;
}

export default function EmployeeFilters({ filters, onChange }: EmployeeFiltersProps) {
  const [searchInput, setSearchInput] = React.useState(filters.search);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== filters.search) {
        onChange({ search: searchInput });
      }
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: "100%" }}>
      <TextField
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        placeholder="Search by name, email, or employee ID"
        size="small"
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <Box sx={{ minWidth: { sm: 200 } }}>
        <TextField
          select
          label="Department"
          value={filters.department}
          onChange={(event) => onChange({ department: event.target.value })}
          size="small"
          fullWidth
        >
          <MenuItem value="All">All departments</MenuItem>
          {DEPARTMENT_OPTIONS.map((department) => (
            <MenuItem key={department} value={department}>
              {department}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ minWidth: { sm: 160 } }}>
        <TextField
          select
          label="Status"
          value={filters.status}
          onChange={(event) =>
            onChange({ status: event.target.value as EmployeeFiltersType["status"] })
          }
          size="small"
          fullWidth
        >
          <MenuItem value="All">All statuses</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
      </Box>
    </Stack>
  );
}
