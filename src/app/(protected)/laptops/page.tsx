import type { Metadata } from "next";
import { Box, Paper, Typography } from "@mui/material";
import LaptopRoundedIcon from "@mui/icons-material/LaptopRounded";

export const metadata: Metadata = {
  title: "Laptop Details | IT Allocation Portal",
};

export default function LaptopsPage() {
  return (
    <Box>
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Laptop Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track laptop assignments, specifications, and allocation status.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 6,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <LaptopRoundedIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1.5 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Laptop inventory coming soon
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          This section is not yet connected to live data.
        </Typography>
      </Paper>
    </Box>
  );
}
