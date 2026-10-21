"use client";

import * as React from "react";
import { Box, Toolbar } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/constants/navigation";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Header onMenuClick={() => setMobileOpen(true)} />
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        }}
      >
        <Toolbar sx={{ height: HEADER_HEIGHT }} />
        <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, bgcolor: "background.default" }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
