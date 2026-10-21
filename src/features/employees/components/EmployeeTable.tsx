"use client";

import * as React from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useEmployees } from "../hooks/useEmployees";
import EmployeeFilters from "./EmployeeFilters";
import EmployeeFormDialog from "./EmployeeFormDialog";
import EmployeeViewDialog from "./EmployeeViewDialog";
import type { Employee, EmployeeInput } from "../types";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

type DialogMode = "add" | "edit" | null;

export default function EmployeeTable() {
  const {
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
  } = useEmployees();

  const [dialogMode, setDialogMode] = React.useState<DialogMode>(null);
  const [activeEmployee, setActiveEmployee] = React.useState<Employee | null>(null);
  const [viewEmployee, setViewEmployee] = React.useState<Employee | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Employee | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const openAddDialog = () => {
    setActiveEmployee(null);
    setDialogMode("add");
  };

  const openEditDialog = (employee: Employee) => {
    setActiveEmployee(employee);
    setDialogMode("edit");
  };

  const closeFormDialog = () => {
    setDialogMode(null);
    setActiveEmployee(null);
  };

  const handleFormSubmit = async (input: EmployeeInput) => {
    setIsSubmitting(true);
    try {
      if (dialogMode === "edit" && activeEmployee) {
        await editEmployee(activeEmployee.id, input);
      } else {
        await addEmployee(input);
      }
      closeFormDialog();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await removeEmployee(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mb: 3,
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Employee Directory
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {total} employee{total === 1 ? "" : "s"} found
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={openAddDialog}>
          Add Employee
        </Button>
      </Stack>

      <Box sx={{ mb: 2.5 }}>
        <EmployeeFilters filters={filters} onChange={updateFilters} />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading && employees.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                  <Typography variant="body2" color="text.secondary">
                    No employees match the current filters.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {isLoading
              ? Array.from({ length: pageSize }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell colSpan={6}>
                      <Box sx={{ height: 24 }} />
                    </TableCell>
                  </TableRow>
                ))
              : employees.map((employee) => (
                  <TableRow key={employee.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                        <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main", fontSize: 13 }}>
                          {getInitials(employee.name)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {employee.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {employee.employeeCode} · {employee.email}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.designation}</TableCell>
                    <TableCell>{employee.location}</TableCell>
                    <TableCell>
                      <Chip
                        label={employee.status}
                        size="small"
                        color={employee.status === "Active" ? "success" : "default"}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View">
                        <IconButton size="small" onClick={() => setViewEmployee(employee)}>
                          <VisibilityRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => openEditDialog(employee)}>
                          <EditRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setDeleteTarget(employee)}
                        >
                          <DeleteRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
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
        rowsPerPageOptions={[8, 16, 24]}
      />

      <EmployeeFormDialog
        open={dialogMode !== null}
        employee={activeEmployee}
        isSubmitting={isSubmitting}
        onClose={closeFormDialog}
        onSubmit={handleFormSubmit}
      />

      <EmployeeViewDialog
        open={Boolean(viewEmployee)}
        employee={viewEmployee}
        onClose={() => setViewEmployee(null)}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete employee"
        description={`Are you sure you want to delete ${deleteTarget?.name ?? "this employee"}? This action cannot be undone.`}
        confirmLabel="Delete"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </Paper>
  );
}
