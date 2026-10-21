"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { DEPARTMENT_OPTIONS } from "../data/mockEmployees";
import type { Employee, EmployeeInput } from "../types";

const LOCATION_OPTIONS = ["Bengaluru", "Hyderabad", "Pune", "Mumbai", "Delhi NCR", "Chennai"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s]{7,15}$/;

interface EmployeeFormDialogProps {
  open: boolean;
  employee?: Employee | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (input: EmployeeInput) => Promise<void>;
}

const EMPTY_VALUES: EmployeeInput = {
  employeeCode: "",
  name: "",
  email: "",
  phone: "",
  department: DEPARTMENT_OPTIONS[0],
  designation: "",
  location: LOCATION_OPTIONS[0],
  status: "Active",
  joinDate: new Date().toISOString().slice(0, 10),
};

export default function EmployeeFormDialog({
  open,
  employee,
  isSubmitting = false,
  onClose,
  onSubmit,
}: EmployeeFormDialogProps) {
  const isEditMode = Boolean(employee);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeInput>({
    defaultValues: EMPTY_VALUES,
  });

  React.useEffect(() => {
    if (open) {
      reset(employee ? { ...employee } : EMPTY_VALUES);
    }
  }, [open, employee, reset]);

  const submitHandler = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? "Edit Employee" : "Add Employee"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("name", { required: "Name is required." })}
              label="Full name"
              fullWidth
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("email", {
                required: "Email is required.",
                pattern: { value: EMAIL_PATTERN, message: "Enter a valid email." },
              })}
              label="Email"
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("phone", {
                required: "Phone number is required.",
                pattern: { value: PHONE_PATTERN, message: "Enter a valid phone number." },
              })}
              label="Phone"
              fullWidth
              error={Boolean(errors.phone)}
              helperText={errors.phone?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("designation", { required: "Designation is required." })}
              label="Designation"
              fullWidth
              error={Boolean(errors.designation)}
              helperText={errors.designation?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="department"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} select label="Department" fullWidth>
                  {DEPARTMENT_OPTIONS.map((department) => (
                    <MenuItem key={department} value={department}>
                      {department}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="location"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} select label="Location" fullWidth>
                  {LOCATION_OPTIONS.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("joinDate", { required: "Join date is required." })}
              label="Join date"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              error={Boolean(errors.joinDate)}
              helperText={errors.joinDate?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="status"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} select label="Status" fullWidth>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </TextField>
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={submitHandler} variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : isEditMode ? "Save changes" : "Add employee"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
