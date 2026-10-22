import type { Metadata } from "next";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LaptopRoundedIcon from "@mui/icons-material/LaptopRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import StatSummaryCard from "@/components/common/StatSummaryCard";
import LaptopTable from "@/features/laptops/components/LaptopTable";
import {
  ASSIGNED_LAPTOPS,
  TOTAL_LAPTOPS,
  UNASSIGNED_LAPTOPS,
} from "@/features/laptops/data/laptopDirectory";

export const metadata: Metadata = {
  title: "Laptop Details | IT Allocation Portal",
};

export default function LaptopsPage() {
  const monthYear = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Laptop Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View laptop inventory, assignments, and device specifications.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatSummaryCard
            label="Total laptops"
            value={TOTAL_LAPTOPS}
            caption={`Sample subset · ${monthYear}`}
            icon={LaptopRoundedIcon}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatSummaryCard
            label="Assigned laptops"
            value={ASSIGNED_LAPTOPS}
            caption="Within the 10-record sample subset"
            icon={CheckCircleRoundedIcon}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatSummaryCard
            label="Unassigned / in repair"
            value={UNASSIGNED_LAPTOPS}
            caption="Within the 10-record sample subset"
            icon={ReportProblemRoundedIcon}
          />
        </Grid>
      </Grid>

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <InfoOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
        <Typography variant="caption" color="text.secondary">
          10 fictional sample records · Sample subset, not the full fleet inventory · Business Head
          access is read-only.
        </Typography>
      </Stack>

      <LaptopTable />

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <InfoOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
        <Typography variant="caption" color="text.secondary">
          Asset type and status are illustrative. All laptop records are sample data, not live
          backend data.
        </Typography>
      </Stack>
    </Stack>
  );
}
