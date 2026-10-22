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
import { useEmployeeDirectory } from "../hooks/useEmployeeDirectory";
import EmployeeFilters from "./EmployeeFilters";

const COLUMNS = ["Emp ID", "Name", "Department", "Vertical", "Licence Type", "IT Assets"];
const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];

export default function EmployeeTable() {
  const {
    employees,
    total,
    filters,
    page,
    pageSize,
    hasActiveFilters,
    updateFilters,
    clearFilters,
    changePage,
    changePageSize,
  } = useEmployeeDirectory();

  const monthYear = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, border: "1px solid", borderColor: "divider" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{ mb: 2.5, alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Employee records
          </Typography>
          <Chip label={`${total} sample records`} size="small" sx={{ fontWeight: 600 }} />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {monthYear}
        </Typography>
      </Stack>

      <Box sx={{ mb: 2.5 }}>
        <EmployeeFilters
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
            {employees.length === 0 && (
              <TableRow>
                <TableCell colSpan={COLUMNS.length} align="center" sx={{ py: 5 }}>
                  <Typography variant="body2" color="text.secondary">
                    No employees match the current filters.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {employees.map((employee) => (
              <TableRow key={employee.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {employee.empId}
                  </Typography>
                </TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.department ?? "—"}</TableCell>
                <TableCell>{employee.vertical}</TableCell>
                <TableCell>
                  <Chip
                    label={employee.licenceType}
                    size="small"
                    sx={{ bgcolor: "#fdecea", color: "error.main", fontWeight: 700 }}
                  />
                </TableCell>
                <TableCell>
                  <Chip label={employee.itAsset} size="small" sx={{ bgcolor: "action.selected", fontWeight: 600 }} />
                </TableCell>
              </TableRow>
            ))}
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
    </Paper>
  );
}
