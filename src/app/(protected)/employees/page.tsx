import type { Metadata } from "next";
import { Box, Typography } from "@mui/material";
import EmployeeTable from "@/features/employees/components/EmployeeTable";

export const metadata: Metadata = {
  title: "Employee Details | IT Allocation Portal",
};

export default function EmployeesPage() {
  return (
    <Box>
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Employee Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage employee records, assignments, and contact information.
        </Typography>
      </Box>
      <EmployeeTable />
    </Box>
  );
}
