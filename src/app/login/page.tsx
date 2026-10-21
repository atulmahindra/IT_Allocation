import type { Metadata } from "next";
import { Suspense } from "react";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LoginForm from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in | IT Allocation Portal",
};

const HIGHLIGHTS = [
  "Employee and laptop allocation overview",
  "Licensing cost visibility across departments",
  "Monthly workforce and IT budget reporting",
];

export default function LoginPage() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex" }}>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          width: "50%",
          bgcolor: "#ffffff",
          px: 10,
        }}
      >
        <Stack spacing={3} sx={{ maxWidth: 480 }}>
          <Chip
            label="IT ASSET MANAGEMENT"
            size="small"
            sx={{
              alignSelf: "flex-start",
              bgcolor: "#fdecea",
              color: "error.main",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: 0.5,
              borderRadius: 1,
            }}
          />
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, lineHeight: 1.15, color: "text.primary" }}
          >
            Manage every employee asset with clarity.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18 }}>
            Track IT allocations, monitor licensing costs, and keep budgets on target — all
            from one place.
          </Typography>
          <Stack spacing={1.5} sx={{ mt: 1 }}>
            {HIGHLIGHTS.map((item) => (
              <Stack key={item} direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <CheckCircleRoundedIcon sx={{ color: "success.main" }} fontSize="small" />
                <Typography variant="body1" color="text.primary">
                  {item}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#e9edf3",
          px: 2,
          py: 6,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 430,
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            boxShadow: "0 24px 48px -12px rgba(26, 34, 51, 0.18)",
          }}
        >
          <Stack spacing={0.5} sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in with your corporate account.
            </Typography>
          </Stack>

          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </Paper>
      </Box>
    </Box>
  );
}
