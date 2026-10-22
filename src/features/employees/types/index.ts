export type LicenceType = "E1" | "E3";
export type EmploymentType = "Fixed" | "Variable";

export interface EmployeeRecord {
  id: string;
  empId: string;
  name: string;
  department: string | null;
  vertical: string;
  licenceType: LicenceType;
  itAsset: string;
  employmentType: EmploymentType;
}

export interface EmployeeDirectoryFilters {
  search: string;
  department: string;
  vertical: string;
  licenceType: LicenceType | "All";
}
