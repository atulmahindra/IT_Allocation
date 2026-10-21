import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";

export interface NavItem {
  label: string;
  href: string;
  icon: typeof DashboardRoundedIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardRoundedIcon },
  { label: "Employee Details", href: "/employees", icon: BadgeRoundedIcon },
];

export const SIDEBAR_WIDTH = 260;
export const HEADER_HEIGHT = 64;
