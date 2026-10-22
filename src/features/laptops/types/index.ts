export type AssetType = "Standard Laptop" | "Premium Laptop";
export type AssetStatus = "Assigned" | "Unassigned" | "In Repair";

export interface LaptopRecord {
  id: string;
  assetId: string;
  model: string;
  assignedTo: string | null;
  department: string | null;
  assetType: AssetType;
  status: AssetStatus;
}

export interface LaptopDirectoryFilters {
  search: string;
  department: string;
  assetType: AssetType | "All";
  status: AssetStatus | "All";
}
