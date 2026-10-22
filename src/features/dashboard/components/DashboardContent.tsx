import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import AllocationStatCard from "./AllocationStatCard";
import AllocationChart from "./AllocationChart";
import { SELECTED, TOTAL_IT_BUDGET, formatInr } from "../data/allocationOverview";

const TOTAL_EMPLOYEES = SELECTED.fixedEmployees + SELECTED.variableEmployees;

export default function DashboardContent() {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Monitor employee allocations, licensing costs, and monthly IT budget.
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <InfoOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
        <Typography variant="caption" color="text.secondary">
          Illustrative monthly aggregates · {SELECTED.month} 2026 · Not live backend data
        </Typography>
      </Stack>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <AllocationStatCard
            label="Fixed Employees"
            value={String(SELECTED.fixedEmployees)}
            unit="employees"
            secondaryValue={formatInr(SELECTED.fixedCost)}
            caption="Monthly allocation cost"
            icon={GroupsRoundedIcon}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <AllocationStatCard
            label="Variable Employees"
            value={String(SELECTED.variableEmployees)}
            unit="employees"
            secondaryValue={formatInr(SELECTED.variableCost)}
            caption="New joiners / variable workforce"
            icon={PersonAddAlt1RoundedIcon}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <AllocationStatCard
            label="Total IT Budget"
            value={formatInr(TOTAL_IT_BUDGET)}
            secondaryValue={`${SELECTED.month} 2026`}
            caption="Monthly budget allocation"
            icon={AccountBalanceWalletRoundedIcon}
          />
        </Grid>
      </Grid>

      <AllocationChart />

      <Box
        sx={{
          p: 3,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Allocation Highlights
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Monthly illustrative aggregate
          </Typography>
        </Stack>

        <Stack direction="row" spacing={5} sx={{ flexWrap: "wrap" }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "baseline" }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {TOTAL_EMPLOYEES}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total employees
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: "baseline" }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {SELECTED.fixedEmployees}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fixed employees
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: "baseline" }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {SELECTED.variableEmployees}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Variable employees
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
