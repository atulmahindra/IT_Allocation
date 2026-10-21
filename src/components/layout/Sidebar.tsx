"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import { HEADER_HEIGHT, NAV_ITEMS, SIDEBAR_WIDTH } from "@/constants/navigation";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (href: string) => {
    router.push(href);
    onClose();
  };

  const navList = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          height: HEADER_HEIGHT,
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          px: 2.5,
        }}
      >
        <MemoryRoundedIcon color="primary" fontSize="medium" />
        <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700 }}>
          IT Allocation Portal
        </Typography>
      </Box>
      <Divider />
      <List sx={{ px: 1.5, py: 2, flexGrow: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <ListItemButton
              key={item.href}
              selected={isActive}
              onClick={() => handleNavigate(item.href)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: isActive ? "primary.main" : "text.primary",
                bgcolor: isActive ? "action.selected" : "transparent",
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "& .MuiListItemIcon-root": { color: "primary.contrastText" },
                  "&:hover": { bgcolor: "primary.dark" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: isActive ? "inherit" : "text.secondary" }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{ primary: { sx: { fontWeight: isActive ? 600 : 500 } } }}
              />
            </ListItemButton>
          );
        })}
      </List>
      <Divider />
      <Typography variant="caption" color="text.secondary" sx={{ px: 2.5, py: 2 }}>
        © {new Date().getFullYear()} IT Allocation Portal
      </Typography>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: SIDEBAR_WIDTH }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: SIDEBAR_WIDTH, boxSizing: "border-box" },
        }}
      >
        {navList}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { width: SIDEBAR_WIDTH, boxSizing: "border-box" },
        }}
        open
      >
        {navList}
      </Drawer>
    </Box>
  );
}
