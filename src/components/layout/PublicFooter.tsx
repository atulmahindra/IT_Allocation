import { Box, Stack, Typography } from "@mui/material";

export default function PublicFooter() {
  const monthYear = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <Box
      component="footer"
      sx={{
        px: { xs: 2, md: 4 },
        py: 2,
        bgcolor: "rgba(255, 255, 255, 1)",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={0.5}
        sx={{
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          IT Asset Allocation Portal · Internal use only
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {monthYear} · Static sample · No authentication or routing connected
        </Typography>
      </Stack>
    </Box>
  );
}
