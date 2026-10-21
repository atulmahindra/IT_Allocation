"use client";

import {
  Box,
  Chip,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useDashboard } from "../hooks/useDashboard";
import StatCard from "./StatCard";

export default function DashboardContent() {
  const { user } = useAuth();
  const { stats, departmentBreakdown, recentEmployees, isLoading } = useDashboard();

  const maxDepartmentCount = Math.max(1, ...departmentBreakdown.map((item) => item.count));

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Here&apos;s an overview of your organization&apos;s IT allocation status.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Total Employees"
            value={isLoading ? "–" : stats?.totalEmployees ?? 0}
            icon={GroupsRoundedIcon}
            accentColor="#1456c7"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Active Employees"
            value={isLoading ? "–" : stats?.activeEmployees ?? 0}
            icon={CheckCircleRoundedIcon}
            accentColor="#2e7d32"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Inactive Employees"
            value={isLoading ? "–" : stats?.inactiveEmployees ?? 0}
            icon={CancelRoundedIcon}
            accentColor="#d32f2f"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Departments"
            value={isLoading ? "–" : stats?.departmentCount ?? 0}
            icon={ApartmentRoundedIcon}
            accentColor="#00897b"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2.5, height: "100%" }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>
              Employees by Department
            </Typography>
            <Stack spacing={2}>
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} variant="rounded" height={32} />
                  ))
                : departmentBreakdown.map((item) => (
                    <Box key={item.department}>
                      <Stack direction="row" sx={{ mb: 0.5, justifyContent: "space-between" }}>
                        <Typography variant="body2">{item.department}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.count}
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={(item.count / maxDepartmentCount) * 100}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2.5, height: "100%" }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>
              Recently Joined
            </Typography>
            <Stack spacing={1.5}>
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} variant="rounded" height={44} />
                  ))
                : recentEmployees.map((employee) => (
                    <Stack
                      key={employee.id}
                      direction="row"
                      sx={{
                        py: 1,
                        px: 1.5,
                        borderRadius: 2,
                        bgcolor: "background.default",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {employee.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {employee.designation} · {employee.department}
                        </Typography>
                      </Box>
                      <Chip
                        label={employee.status}
                        size="small"
                        color={employee.status === "Active" ? "success" : "default"}
                      />
                    </Stack>
                  ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
