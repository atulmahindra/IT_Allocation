"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import WindowRoundedIcon from "@mui/icons-material/WindowRounded";
import { useAuth } from "../hooks/useAuth";
import { DEFAULT_AUTHENTICATED_PATH } from "@/constants/auth";
import type { LoginCredentials } from "../types";

export default function LoginForm() {
  const router = useRouter();
  const { login, isSubmitting, error } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    defaultValues: { email: "", password: "", rememberMe: false },
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await login(values);
      router.replace(DEFAULT_AUTHENTICATED_PATH);
    } catch {
      // Error state is surfaced via the auth context.
    }
  });

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ width: "100%" }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        {...register("email", {
          validate: (value) => value.trim().length > 0 || "Email is required.",
        })}
        label="Email / Token ID"
        placeholder="name@company.com"
        fullWidth
        margin="normal"
        autoComplete="username"
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />

      <TextField
        {...register("password", {
          validate: (value) => value.trim().length > 0 || "Password is required.",
        })}
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        autoComplete="current-password"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Stack direction="row" sx={{ mt: 1, alignItems: "center", justifyContent: "space-between" }}>
        <FormControlLabel
          control={<Checkbox {...register("rememberMe")} />}
          label="Remember me"
        />
        <Tooltip title="Password reset isn't available in this demo yet.">
          <Typography
            component="button"
            type="button"
            variant="body2"
            onClick={(event) => event.preventDefault()}
            sx={{
              color: "error.main",
              fontWeight: 600,
              background: "none",
              border: "none",
              p: 0,
              cursor: "pointer",
            }}
          >
            Forgot password?
          </Typography>
        </Tooltip>
      </Stack>

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={isSubmitting}
        sx={{
          mt: 3,
          py: 1.25,
          bgcolor: "#8a1414",
          fontWeight: 700,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          "&:hover": { bgcolor: "#6e0f0f" },
        }}
      >
        {isSubmitting ? "Signing in..." : "Login"}
      </Button>

      <Stack direction="row" spacing={1.5} sx={{ my: 2.5, alignItems: "center" }}>
        <Divider sx={{ flex: 1 }} />
        <Typography variant="caption" color="text.secondary">
          OR
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Stack>

      <Tooltip title="Microsoft SSO isn't configured for this demo yet.">
        <span style={{ display: "block" }}>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            disabled
            startIcon={<WindowRoundedIcon />}
            sx={{ fontWeight: 600, color: "text.primary", borderColor: "divider" }}
          >
            Continue with Microsoft SSO
          </Button>
        </span>
      </Tooltip>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 3, textAlign: "center" }}
      >
        Need access? Contact your procurement administrator.
      </Typography>

    </Box>
  );
}
