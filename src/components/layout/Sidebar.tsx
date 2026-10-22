"use client";

import * as React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
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
          minHeight: HEADER_HEIGHT,
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          px: 2.5,
          py: 2,
        }}
      >
        <Image src="/images/logo.png" alt="" width={40} height={40} style={{ borderRadius: 8 }} />
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            IT Allocation
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            Enterprise portal
          </Typography>
        </Box>
      </Box>
      <Box sx={{ px: 2.5, pt: 2.5, pb: 1 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}
        >
          Workspace
        </Typography>
      </Box>
      <List sx={{ px: 1.5, py: 0.5, flexGrow: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <ListItemButton
              key={item.href}
              selected={isActive}
              onClick={() => handleNavigate(item.href)}
              sx={{
                borderRadius: "6px",
                mb: 0.5,
                color: isActive ? "error.main" : "text.primary",
                "&.Mui-selected": {
                  bgcolor: "#fdecea",
                  color: "error.main",
                  "& .MuiListItemIcon-root": { color: "error.main" },
                  "&:hover": { bgcolor: "#fbe0dd" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: isActive ? "inherit" : "text.secondary" }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{ primary: { sx: { fontWeight: isActive ? 700 : 500 } } }}
              />
            </ListItemButton>
          );
        })}
      </List>
      <Stack spacing={0.25} sx={{ px: 2.5, py: 2, textAlign: "center" }}>
        <Typography variant="caption" sx={{ fontWeight: 700 }}>
          © Mahindra-Logistics
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: "italic" }}>
          All rights reserved.
        </Typography>
      </Stack>
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
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            boxSizing: "border-box",
            bgcolor: "rgba(255, 255, 255, 1)",
          },
        }}
      >
        {navList}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            boxSizing: "border-box",
            bgcolor: "rgba(255, 255, 255, 1)",
          },
        }}
        open
      >
        {navList}
      </Drawer>
    </Box>
  );
}
