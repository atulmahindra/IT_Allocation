import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        borderTop: "1px solid",
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        © {new Date().getFullYear()} IT Allocation Portal. All rights reserved.
      </Typography>
    </Box>
  );
}
