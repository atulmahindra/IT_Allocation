export interface NavItem {
  label: string;
  href: string;
  icon: string;
  activeIcon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "/menu/Dashboard.png", activeIcon: "/menu/dashboard_active.png" },
  { label: "Employee Details", href: "/employees", icon: "/menu/Employee_Details.png", activeIcon: "/menu/Employee_Details_active.png" },
  { label: "Laptop Details", href: "/laptops", icon: "/menu/Laptop_Details.png", activeIcon: "/menu/Laptop_Details_active.png" },
];

export const SIDEBAR_WIDTH = 260;
export const HEADER_HEIGHT = 64;
