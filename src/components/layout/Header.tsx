"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AppBar, Avatar, Box, Divider, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { HEADER_HEIGHT, NAV_ITEMS, SIDEBAR_WIDTH } from "@/constants/navigation";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const currentPage =
    NAV_ITEMS.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))?.label ??
    "Dashboard";

  const monthYear = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

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
            sx={{
              alignItems: "center",
              px: 1.5,
              py: 0.5,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "8px",
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Typography variant="body2">{monthYear}</Typography>
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
          </Stack>

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

          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
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
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
