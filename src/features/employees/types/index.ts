export type EmployeeStatus = "Active" | "Inactive";

export interface Employee {
  id: string;
  employeeCode: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  location: string;
  status: EmployeeStatus;
  joinDate: string;
}

export type EmployeeInput = Omit<Employee, "id">;

export interface EmployeeFilters {
  search: string;
  department: string;
  status: EmployeeStatus | "All";
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

export interface EmployeeQueryParams extends EmployeeFilters {
  page: number;
  pageSize: number;
}
