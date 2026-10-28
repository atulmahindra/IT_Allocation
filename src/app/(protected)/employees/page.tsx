import type { Metadata } from "next";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StatSummaryCard from "@/components/common/StatSummaryCard";
import EmployeeTable from "@/features/employees/components/EmployeeTable";
import { FIXED_EMPLOYEES, TOTAL_EMPLOYEES, VARIABLE_EMPLOYEES } from "@/features/employees/data/employeeDirectory";

export const metadata: Metadata = {
  title: "Employee Details | IT Allocation Portal",
};

export default function EmployeesPage() {
  const monthYear = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Employee Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View employee records and their assigned licence categories.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatSummaryCard
            label="Total employees"
            value={TOTAL_EMPLOYEES}
            caption={`Sample subset · ${monthYear}`}
            icon="/card/Fixed_Employees.png"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatSummaryCard
            label="Fixed employees"
            value={FIXED_EMPLOYEES}
            caption="Within the 10-record sample subset"
            icon="/card/fixed_employees1.png"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatSummaryCard
            label="Variable employees"
            value={VARIABLE_EMPLOYEES}
            caption="Within the 10-record sample subset"
            icon="/card/Variable_Employees.png"
          />
        </Grid>
      </Grid>

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <InfoOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
        <Typography variant="caption" color="text.secondary">
          10 fictional sample records · Sample subset, not the 120-employee monthly aggregate ·
          Business Head access is read-only.
        </Typography>
      </Stack>

      <EmployeeTable />

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <InfoOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
        <Typography variant="caption" color="text.secondary">
          Fixed / variable classification is illustrative. All employee and allocation records are
          sample data, not live backend data.
        </Typography>
      </Stack>
    </Stack>
  );
}
