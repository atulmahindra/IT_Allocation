"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { HEADER_HEIGHT, NAV_ITEMS, SIDEBAR_WIDTH } from "@/constants/navigation";
import HeaderDateRangePicker from "./HeaderDateRangePicker";

function formatRange(start: Dayjs, end: Dayjs): string {
  if (start.isSame(end, "day")) return start.format("MMM D, YYYY");
  if (start.isSame(end, "month")) return `${start.format("MMM D")} – ${end.format("D, YYYY")}`;
  return `${start.format("MMM D, YYYY")} – ${end.format("MMM D, YYYY")}`;
}

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [dateAnchorEl, setDateAnchorEl] = React.useState<HTMLElement | null>(null);

  const today = React.useMemo(() => dayjs(), []);
  const [appliedRange, setAppliedRange] = React.useState<{ start: Dayjs; end: Dayjs }>({
    start: today.subtract(3, "month"),
    end: today,
  });
  const currentPage =
    NAV_ITEMS.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))?.label ??
    "Dashboard";

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleLogout = () => {
    handleCloseMenu();
    logout();
  };

  const handleOpenDatePicker = (event: React.MouseEvent<HTMLElement>) => setDateAnchorEl(event.currentTarget);
  const handleCloseDatePicker = () => setDateAnchorEl(null);
  const handleApplyRange = (range: { start: Dayjs; end: Dayjs }) => {
    setAppliedRange(range);
    handleCloseDatePicker();
  };

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        height: HEADER_HEIGHT,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        ml: { md: `${SIDEBAR_WIDTH}px` },
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ height: HEADER_HEIGHT, gap: 1.5 }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ display: { md: "none" } }}
          aria-label="Open navigation menu"
        >
          <MenuRoundedIcon />
        </IconButton>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{ alignItems: "center", display: { xs: "none", sm: "flex" } }}
        >
          <Typography variant="body2" color="text.secondary">
            Workspace
          </Typography>
          <ChevronRightRoundedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {currentPage}
          </Typography>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Stack
            direction="row"
            spacing={0.5}
            onClick={handleOpenDatePicker}
            sx={{
              alignItems: "center",
              px: 1.5,
              py: 0.5,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "8px",
              display: { xs: "none", sm: "flex" },
              cursor: "pointer",
            }}
            aria-haspopup="true"
            aria-expanded={Boolean(dateAnchorEl)}
          >
            <Typography variant="body2">{formatRange(appliedRange.start, appliedRange.end)}</Typography>
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
          </Stack>

          <HeaderDateRangePicker
            anchorEl={dateAnchorEl}
            value={appliedRange}
            onClose={handleCloseDatePicker}
            onApply={handleApplyRange}
          />

          <IconButton
            size="small"
            aria-label="Notifications"
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
          >
            <NotificationsNoneRoundedIcon fontSize="small" />
          </IconButton>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", sm: "block" }, my: 1 }}
          />

          <Stack
            direction="row"
            spacing={1}
            onClick={handleOpenMenu}
            sx={{ alignItems: "center", cursor: "pointer" }}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl)}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#f1f3f6",
                color: "text.primary",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              BH
            </Avatar>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                Business Head
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Read-only access
              </Typography>
            </Box>
            <KeyboardArrowDownRoundedIcon
              sx={{ fontSize: 18, color: "text.secondary", display: { xs: "none", sm: "block" } }}
            />
          </Stack>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Box sx={{ px: 2, py: 1, minWidth: 200 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Business Head
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Read-only access
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
