import { Paper, Stack, Typography } from "@mui/material";
import type { SvgIconProps } from "@mui/material";

interface StatSummaryCardProps {
  label: string;
  value: string | number;
  caption: string;
  icon: React.ComponentType<SvgIconProps>;
}

export default function StatSummaryCard({ label, value, caption, icon: Icon }: StatSummaryCardProps) {
  return (
    <Paper elevation={0} sx={{ p: 2.5, height: "100%", border: "1px solid", borderColor: "divider" }}>
      <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Icon fontSize="small" sx={{ color: "text.secondary" }} />
      </Stack>

      <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
        {value}
      </Typography>

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
        {caption}
      </Typography>
    </Paper>
  );
}
