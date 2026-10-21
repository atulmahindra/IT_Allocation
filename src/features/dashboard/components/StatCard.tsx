import { Box, Paper, Stack, Typography } from "@mui/material";
import type { SvgIconProps } from "@mui/material";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<SvgIconProps>;
  accentColor?: string;
}

export default function StatCard({ label, value, icon: Icon, accentColor }: StatCardProps) {
  const color = accentColor ?? "#1456c7";

  return (
    <Paper
      sx={{
        p: 2.5,
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: `${color}1A`,
          color,
          flexShrink: 0,
        }}
      >
        <Icon />
      </Box>
      <Stack spacing={0.25}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Stack>
    </Paper>
  );
}
