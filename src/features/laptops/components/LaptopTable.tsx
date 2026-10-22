"use client";

import * as React from "react";
import {
  Box,
  Chip,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useLaptopDirectory } from "../hooks/useLaptopDirectory";
import LaptopFilters from "./LaptopFilters";
import type { AssetStatus } from "../types";

const COLUMNS = ["Asset ID", "Model", "Assigned To", "Department", "Asset Type", "Status"];
const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];

const STATUS_COLOR: Record<AssetStatus, { bgcolor: string; color: string }> = {
  Assigned: { bgcolor: "#e8f5e9", color: "#2e7d32" },
  Unassigned: { bgcolor: "action.selected", color: "text.secondary" },
  "In Repair": { bgcolor: "#fdecea", color: "error.main" },
};

export default function LaptopTable() {
  const {
    laptops,
    total,
    filters,
    page,
    pageSize,
    hasActiveFilters,
    updateFilters,
    clearFilters,
    changePage,
    changePageSize,
  } = useLaptopDirectory();

  const monthYear = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const rangeStart = total === 0 ? 0 : page * pageSize + 1;
  const rangeEnd = Math.min(total, page * pageSize + pageSize);
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, border: "1px solid", borderColor: "divider" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{ mb: 2.5, alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Laptop records
          </Typography>
          <Chip label={`${total} sample records`} size="small" sx={{ fontWeight: 600 }} />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {monthYear}
        </Typography>
      </Stack>

      <Box sx={{ mb: 2.5 }}>
        <LaptopFilters
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          onChange={updateFilters}
          onClear={clearFilters}
        />
      </Box>

      <TableContainer sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
        <Table>
          <TableHead>
            <TableRow>
              {COLUMNS.map((column) => (
                <TableCell key={column}>
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {column}
                    </Typography>
                    <UnfoldMoreRoundedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {laptops.length === 0 && (
              <TableRow>
                <TableCell colSpan={COLUMNS.length} align="center" sx={{ py: 5 }}>
                  <Typography variant="body2" color="text.secondary">
                    No laptops match the current filters.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {laptops.map((laptop) => (
              <TableRow key={laptop.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {laptop.assetId}
                  </Typography>
                </TableCell>
                <TableCell>{laptop.model}</TableCell>
                <TableCell>{laptop.assignedTo ?? "—"}</TableCell>
                <TableCell>{laptop.department ?? "—"}</TableCell>
                <TableCell>
                  <Chip label={laptop.assetType} size="small" sx={{ bgcolor: "action.selected", fontWeight: 600 }} />
                </TableCell>
                <TableCell>
                  <Chip
                    label={laptop.status}
                    size="small"
                    sx={{ ...STATUS_COLOR[laptop.status], fontWeight: 700 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{ mt: 2, alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {rangeStart}-{rangeEnd} of {total} sample records
        </Typography>

        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Rows per page
          </Typography>
          <TextField
            select
            size="small"
            value={pageSize}
            onChange={(event) => changePageSize(Number(event.target.value))}
            sx={{ width: 80 }}
          >
            {ROWS_PER_PAGE_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <IconButton
            size="small"
            disabled={page === 0}
            onClick={() => changePage(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeftRoundedIcon fontSize="small" />
          </IconButton>
          <Chip
            label={page + 1}
            size="small"
            sx={{ bgcolor: "error.main", color: "error.contrastText", fontWeight: 700, minWidth: 28 }}
          />
          <IconButton
            size="small"
            disabled={page >= pageCount - 1}
            onClick={() => changePage(page + 1)}
            aria-label="Next page"
          >
            <ChevronRightRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
}
