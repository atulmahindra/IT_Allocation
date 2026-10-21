import { createTheme } from "@mui/material/styles";

const FONT_FAMILY = "var(--font-georama), 'Helvetica Neue', Arial, sans-serif";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1456c7",
      light: "#4c7fe0",
      dark: "#0d3c92",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00897b",
      contrastText: "#ffffff",
    },
    success: { main: "#2e7d32" },
    warning: { main: "#ed6c02" },
    error: { main: "#d32f2f" },
    background: {
      default: "#f4f6f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a2233",
      secondary: "#5b6b82",
    },
    divider: "rgba(26, 34, 51, 0.09)",
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: FONT_FAMILY,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontStretch: "semi-expanded",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid rgba(26, 34, 51, 0.09)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: "#f4f6f9",
          whiteSpace: "nowrap",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid rgba(26, 34, 51, 0.09)",
        },
      },
    },
  },
});

export default theme;
