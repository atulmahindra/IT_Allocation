"use client";

import * as React from "react";
import { Box, InputAdornment, MenuItem, Stack, TextField, Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { DEPARTMENT_OPTIONS, LICENCE_TYPE_OPTIONS, VERTICAL_OPTIONS } from "../data/employeeDirectory";
import type { EmployeeDirectoryFilters } from "../types";

interface EmployeeFiltersProps {
  filters: EmployeeDirectoryFilters;
  hasActiveFilters: boolean;
  onChange: (next: Partial<EmployeeDirectoryFilters>) => void;
  onClear: () => void;
}

export default function EmployeeFilters({
  filters,
  hasActiveFilters,
  onChange,
  onClear,
}: EmployeeFiltersProps) {
  const [searchInput, setSearchInput] = React.useState(filters.search);

  React.useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

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
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ width: "100%", alignItems: { sm: "center" } }}>
      <TextField
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        placeholder="Search ID or name"
        size="small"
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Box sx={{ minWidth: { sm: 170 } }}>
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

      <Box sx={{ minWidth: { sm: 190 } }}>
        <TextField
          select
          label="Business Vertical"
          value={filters.vertical}
          onChange={(event) => onChange({ vertical: event.target.value })}
          size="small"
          fullWidth
        >
          <MenuItem value="All">All verticals</MenuItem>
          {VERTICAL_OPTIONS.map((vertical) => (
            <MenuItem key={vertical} value={vertical}>
              {vertical}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ minWidth: { sm: 160 } }}>
        <TextField
          select
          label="Licence Type"
          value={filters.licenceType}
          onChange={(event) =>
            onChange({ licenceType: event.target.value as EmployeeDirectoryFilters["licenceType"] })
          }
          size="small"
          fullWidth
        >
          <MenuItem value="All">All licence types</MenuItem>
          {LICENCE_TYPE_OPTIONS.map((licenceType) => (
            <MenuItem key={licenceType} value={licenceType}>
              {licenceType}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {hasActiveFilters && (
        <Typography
          component="button"
          type="button"
          variant="body2"
          onClick={onClear}
          sx={{
            color: "error.main",
            fontWeight: 600,
            background: "none",
            border: "none",
            p: 0,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Clear filters
        </Typography>
      )}
    </Stack>
  );
}
