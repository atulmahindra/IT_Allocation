"use client";

import * as React from "react";
import {
  Box,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useLaptopDirectory } from "../hooks/useLaptopDirectory";
import LaptopFilters from "./LaptopFilters";
import LaptopAssetPopover from "./LaptopAssetPopover";
import type { LaptopAllocationRecord } from "../types";

const COLUMNS = ["Emp ID", "Name", "Department", "Vertical", "Licence Type", "IT Assets"];
const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];

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

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [activeRecord, setActiveRecord] = React.useState<LaptopAllocationRecord | null>(null);

  const monthYear = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const handleAssetClick = (event: React.MouseEvent<HTMLElement>, record: LaptopAllocationRecord) => {
    if (!record.spec) return;
    setAnchorEl(event.currentTarget);
    setActiveRecord(record);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setActiveRecord(null);
  };

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, border: "1px solid", borderColor: "divider" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{ mb: 2.5, alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            IT asset allocations
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
                    No records match the current filters.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {laptops.map((record) => {
              const hasAsset = Boolean(record.spec);
              return (
                <TableRow key={record.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {record.empId}
                    </Typography>
                  </TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.department ?? "—"}</TableCell>
                  <TableCell>{record.vertical}</TableCell>
                  <TableCell>
                    <Chip
                      label={record.licenceType}
                      size="small"
                      sx={{ bgcolor: "#fdecea", color: "error.main", fontWeight: 700 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={record.assetType}
                      size="small"
                      clickable={hasAsset}
                      onClick={hasAsset ? (event) => handleAssetClick(event, record) : undefined}
                      icon={hasAsset ? <InfoOutlinedIcon sx={{ fontSize: 15 }} /> : undefined}
                      sx={{
                        bgcolor: "action.selected",
                        fontWeight: 600,
                        cursor: hasAsset ? "pointer" : "default",
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_, nextPage) => changePage(nextPage)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(event) => changePageSize(Number(event.target.value))}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
      />

      <LaptopAssetPopover anchorEl={anchorEl} record={activeRecord} onClose={handleClosePopover} />
    </Paper>
  );
}
