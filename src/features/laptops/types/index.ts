import type { LicenceType } from "@/features/employees/types";

export type LaptopAssetType =
  | "Standard Laptop"
  | "Business Laptop"
  | "High-Performance Laptop"
  | "No Laptop Required";

export interface LaptopSpec {
  model: string;
  serial: string;
  processor: string;
  ram: string;
  storage: string;
  os: string;
  lastSynced: string;
}

export interface LaptopAllocationRecord {
  id: string;
  empId: string;
  name: string;
  department: string | null;
  vertical: string;
  licenceType: LicenceType;
  assetType: LaptopAssetType;
  spec: LaptopSpec | null;
}

export interface LaptopDirectoryFilters {
  search: string;
  department: string;
  vertical: string;
  licenceType: LicenceType | "All";
  assetType: LaptopAssetType | "All";
}
