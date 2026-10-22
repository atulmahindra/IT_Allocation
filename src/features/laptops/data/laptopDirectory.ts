import { EMPLOYEE_DIRECTORY, VERTICAL_OPTIONS as EMPLOYEE_VERTICALS } from "@/features/employees/data/employeeDirectory";
import type { LaptopAllocationRecord, LaptopAssetType, LaptopSpec } from "../types";

interface AssetAssignment {
  assetType: LaptopAssetType;
  spec: LaptopSpec | null;
}

const ASSET_ASSIGNMENTS: Record<string, AssetAssignment> = {
  EMP1001: {
    assetType: "Standard Laptop",
    spec: { model: "Dell XPS 15", serial: "D9X-20481", processor: "Intel Core i7", ram: "16 GB", storage: "512 GB SSD", os: "Windows 11", lastSynced: "12 Oct 2026" },
  },
  EMP1002: {
    assetType: "Standard Laptop",
    spec: { model: "Dell XPS 15", serial: "D7K-11923", processor: "Intel Core i5", ram: "16 GB", storage: "512 GB SSD", os: "Windows 11", lastSynced: "10 Oct 2026" },
  },
  EMP1003: {
    assetType: "Business Laptop",
    spec: { model: "Lenovo ThinkPad X1 Carbon", serial: "L1C-55820", processor: "Intel Core i7", ram: "16 GB", storage: "512 GB SSD", os: "Windows 11 Pro", lastSynced: "14 Oct 2026" },
  },
  EMP1004: {
    assetType: "Standard Laptop",
    spec: { model: "Dell XPS 15", serial: "D9X-20502", processor: "Intel Core i5", ram: "16 GB", storage: "512 GB SSD", os: "Windows 11", lastSynced: "9 Oct 2026" },
  },
  EMP1005: {
    assetType: "Business Laptop",
    spec: { model: "Lenovo ThinkPad X1 Carbon", serial: "L1C-55841", processor: "Intel Core i7", ram: "16 GB", storage: "512 GB SSD", os: "Windows 11 Pro", lastSynced: "15 Oct 2026" },
  },
  EMP1006: { assetType: "No Laptop Required", spec: null },
  EMP1007: {
    assetType: "High-Performance Laptop",
    spec: { model: "Dell Precision 5680", serial: "DP5-99213", processor: "Intel Core i9", ram: "32 GB", storage: "1 TB SSD", os: "Windows 11 Pro", lastSynced: "16 Oct 2026" },
  },
  EMP1008: {
    assetType: "Standard Laptop",
    spec: { model: "Dell XPS 15", serial: "D9X-20617", processor: "Intel Core i5", ram: "16 GB", storage: "512 GB SSD", os: "Windows 11", lastSynced: "11 Oct 2026" },
  },
  EMP1009: {
    assetType: "Standard Laptop",
    spec: { model: "Dell XPS 15", serial: "D9X-20633", processor: "Intel Core i7", ram: "16 GB", storage: "512 GB SSD", os: "Windows 11", lastSynced: "13 Oct 2026" },
  },
  EMP1010: {
    assetType: "Business Laptop",
    spec: { model: "Lenovo ThinkPad X1 Carbon", serial: "L1C-55902", processor: "Intel Core i7", ram: "16 GB", storage: "512 GB SSD", os: "Windows 11 Pro", lastSynced: "17 Oct 2026" },
  },
};

export const LAPTOP_DIRECTORY: LaptopAllocationRecord[] = EMPLOYEE_DIRECTORY.map((employee) => {
  const assignment = ASSET_ASSIGNMENTS[employee.empId] ?? { assetType: "No Laptop Required" as const, spec: null };
  return {
    id: employee.id,
    empId: employee.empId,
    name: employee.name,
    department: employee.department,
    vertical: employee.vertical,
    licenceType: employee.licenceType,
    assetType: assignment.assetType,
    spec: assignment.spec,
  };
});

export const DEPARTMENT_OPTIONS = Array.from(
  new Set(LAPTOP_DIRECTORY.map((item) => item.department).filter((value): value is string => Boolean(value))),
);

export const VERTICAL_OPTIONS = EMPLOYEE_VERTICALS;

export const LICENCE_TYPE_OPTIONS: Array<LaptopAllocationRecord["licenceType"]> = ["E1", "E3"];

export const ASSET_TYPE_OPTIONS: LaptopAssetType[] = [
  "Standard Laptop",
  "Business Laptop",
  "High-Performance Laptop",
  "No Laptop Required",
];

export const TOTAL_LAPTOP_ALLOCATIONS = LAPTOP_DIRECTORY.filter(
  (item) => item.assetType !== "No Laptop Required",
).length;
export const E1_LICENCE_COUNT = LAPTOP_DIRECTORY.filter((item) => item.licenceType === "E1").length;
export const E3_LICENCE_COUNT = LAPTOP_DIRECTORY.filter((item) => item.licenceType === "E3").length;

export const STANDARD_LAPTOP_COUNT = LAPTOP_DIRECTORY.filter((item) => item.assetType === "Standard Laptop").length;
export const BUSINESS_LAPTOP_COUNT = LAPTOP_DIRECTORY.filter((item) => item.assetType === "Business Laptop").length;
export const HIGH_PERFORMANCE_LAPTOP_COUNT = LAPTOP_DIRECTORY.filter(
  (item) => item.assetType === "High-Performance Laptop",
).length;
