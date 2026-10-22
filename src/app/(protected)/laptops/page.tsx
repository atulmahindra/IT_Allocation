import type { Metadata } from "next";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LaptopRoundedIcon from "@mui/icons-material/LaptopRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import StatSummaryCard from "@/components/common/StatSummaryCard";
import LaptopTable from "@/features/laptops/components/LaptopTable";
import {
  BUSINESS_LAPTOP_COUNT,
  E1_LICENCE_COUNT,
  E3_LICENCE_COUNT,
  HIGH_PERFORMANCE_LAPTOP_COUNT,
  STANDARD_LAPTOP_COUNT,
  TOTAL_LAPTOP_ALLOCATIONS,
} from "@/features/laptops/data/laptopDirectory";

export const metadata: Metadata = {
  title: "Laptop Details | IT Allocation Portal",
};

export default function LaptopsPage() {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Laptop Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View employee-level IT asset and licence allocation details.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatSummaryCard
            label="Total laptop allocations"
            value={TOTAL_LAPTOP_ALLOCATIONS}
            caption="Hardware assigned in 10 sample records"
            icon={LaptopRoundedIcon}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatSummaryCard
            label="E1 licence count"
            value={E1_LICENCE_COUNT}
            caption="Licence assignments across all 10 records"
            icon={CheckCircleOutlineRoundedIcon}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatSummaryCard
            label="E3 licence count"
            value={E3_LICENCE_COUNT}
            caption="Licence assignments across all 10 records"
            icon={CheckCircleOutlineRoundedIcon}
          />
        </Grid>
      </Grid>

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <InfoOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
        <Typography variant="caption" color="text.secondary">
          10 fictional sample records · No Laptop Required is excluded from hardware totals ·
          Business Head access is read-only.
        </Typography>
      </Stack>

      <LaptopTable />

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <InfoOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
        <Typography variant="caption" color="text.secondary">
          Hardware total: {STANDARD_LAPTOP_COUNT} Standard Laptop + {BUSINESS_LAPTOP_COUNT} Business
          Laptop + {HIGH_PERFORMANCE_LAPTOP_COUNT} High-Performance Laptop. Licence counts include
          the employee with No Laptop Required.
        </Typography>
      </Stack>
    </Stack>
  );
}
