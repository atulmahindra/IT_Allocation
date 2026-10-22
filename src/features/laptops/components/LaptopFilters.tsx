"use client";

import * as React from "react";
import { Box, InputAdornment, MenuItem, Stack, TextField, Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { ASSET_TYPE_OPTIONS, DEPARTMENT_OPTIONS, STATUS_OPTIONS } from "../data/laptopDirectory";
import type { LaptopDirectoryFilters } from "../types";

interface LaptopFiltersProps {
  filters: LaptopDirectoryFilters;
  hasActiveFilters: boolean;
  onChange: (next: Partial<LaptopDirectoryFilters>) => void;
  onClear: () => void;
}

export default function LaptopFilters({ filters, hasActiveFilters, onChange, onClear }: LaptopFiltersProps) {
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
        placeholder="Search asset ID, model, or assignee"
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

      <Box sx={{ minWidth: { sm: 170 } }}>
        <TextField
          select
          label="Asset Type"
          value={filters.assetType}
          onChange={(event) =>
            onChange({ assetType: event.target.value as LaptopDirectoryFilters["assetType"] })
          }
          size="small"
          fullWidth
        >
          <MenuItem value="All">All asset types</MenuItem>
          {ASSET_TYPE_OPTIONS.map((assetType) => (
            <MenuItem key={assetType} value={assetType}>
              {assetType}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ minWidth: { sm: 160 } }}>
        <TextField
          select
          label="Status"
          value={filters.status}
          onChange={(event) => onChange({ status: event.target.value as LaptopDirectoryFilters["status"] })}
          size="small"
          fullWidth
        >
          <MenuItem value="All">All statuses</MenuItem>
          {STATUS_OPTIONS.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
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
