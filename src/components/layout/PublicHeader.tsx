import { Box, Stack, Typography } from "@mui/material";

export default function PublicHeader() {
  return (
    <Box
      component="header"
      sx={{
        px: { xs: 2, md: 4 },
        py: 2,
        bgcolor: "rgba(255, 255, 255, 1)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "8px",
              bgcolor: "#fdecea",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ color: "error.main", fontWeight: 800, fontSize: 14 }}>
              IT
            </Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            IT Allocation Portal
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          Enterprise access
        </Typography>
      </Stack>
    </Box>
  );
}
