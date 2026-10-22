import { Box, Paper, Stack, Typography } from "@mui/material";
import type { SvgIconProps } from "@mui/material";

interface AllocationStatCardProps {
  label: string;
  value: string;
  unit?: string;
  secondaryValue: string;
  caption: string;
  icon: React.ComponentType<SvgIconProps>;
}

export default function AllocationStatCard({
  label,
  value,
  unit,
  secondaryValue,
  caption,
  icon: Icon,
}: AllocationStatCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{ p: 2.5, height: "100%", border: "1px solid", borderColor: "divider" }}
    >
      <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Icon fontSize="small" sx={{ color: "text.secondary" }} />
      </Stack>

      <Stack direction="row" spacing={0.75} sx={{ alignItems: "baseline", mt: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {value}
        </Typography>
        {unit && (
          <Typography variant="body2" color="text.secondary">
            {unit}
          </Typography>
        )}
      </Stack>

      <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 1.5 }}>
        {secondaryValue}
      </Typography>

      <Box sx={{ mt: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          {caption}
        </Typography>
      </Box>
    </Paper>
  );
}
