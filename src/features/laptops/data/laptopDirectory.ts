import type { LaptopRecord } from "../types";

export const LAPTOP_DIRECTORY: LaptopRecord[] = [
  { id: "LAP1001", assetId: "LAP1001", model: "Dell Latitude 5440", assignedTo: "Aarav Mehta", department: "IT", assetType: "Standard Laptop", status: "Assigned" },
  { id: "LAP1002", assetId: "LAP1002", model: "HP EliteBook 840", assignedTo: "Neha Shah", department: null, assetType: "Standard Laptop", status: "Assigned" },
  { id: "LAP1003", assetId: "LAP1003", model: "Lenovo ThinkPad T14", assignedTo: "Rohan Iyer", department: null, assetType: "Standard Laptop", status: "Assigned" },
  { id: "LAP1004", assetId: "LAP1004", model: "Dell Latitude 5440", assignedTo: "Priya Nair", department: null, assetType: "Standard Laptop", status: "Assigned" },
  { id: "LAP1005", assetId: "LAP1005", model: "Apple MacBook Air M2", assignedTo: "Kabir Desai", department: null, assetType: "Premium Laptop", status: "Assigned" },
  { id: "LAP1006", assetId: "LAP1006", model: "HP EliteBook 840", assignedTo: "Ananya Rao", department: null, assetType: "Standard Laptop", status: "Assigned" },
  { id: "LAP1007", assetId: "LAP1007", model: "Lenovo ThinkPad T14", assignedTo: "Vikram Sethi", department: null, assetType: "Standard Laptop", status: "In Repair" },
  { id: "LAP1008", assetId: "LAP1008", model: "Dell Latitude 5440", assignedTo: "Isha Kapoor", department: null, assetType: "Standard Laptop", status: "Assigned" },
  { id: "LAP1009", assetId: "LAP1009", model: "Apple MacBook Air M2", assignedTo: "Dev Malhotra", department: null, assetType: "Premium Laptop", status: "Assigned" },
  { id: "LAP1010", assetId: "LAP1010", model: "HP EliteBook 840", assignedTo: null, department: null, assetType: "Standard Laptop", status: "Unassigned" },
];

export const DEPARTMENT_OPTIONS = Array.from(
  new Set(LAPTOP_DIRECTORY.map((item) => item.department).filter((value): value is string => Boolean(value))),
);

export const ASSET_TYPE_OPTIONS: Array<LaptopRecord["assetType"]> = ["Standard Laptop", "Premium Laptop"];
export const STATUS_OPTIONS: Array<LaptopRecord["status"]> = ["Assigned", "Unassigned", "In Repair"];

export const TOTAL_LAPTOPS = LAPTOP_DIRECTORY.length;
export const ASSIGNED_LAPTOPS = LAPTOP_DIRECTORY.filter((item) => item.status === "Assigned").length;
export const UNASSIGNED_LAPTOPS = LAPTOP_DIRECTORY.filter((item) => item.status !== "Assigned").length;
