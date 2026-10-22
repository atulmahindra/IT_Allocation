import type { EmployeeRecord } from "../types";

export const EMPLOYEE_DIRECTORY: EmployeeRecord[] = [
  { id: "EMP1001", empId: "EMP1001", name: "Aarav Mehta", department: "IT", vertical: "Technology", licenceType: "E1", itAsset: "Standard Laptop", employmentType: "Fixed" },
  { id: "EMP1002", empId: "EMP1002", name: "Neha Shah", department: null, vertical: "Finance", licenceType: "E3", itAsset: "Standard Laptop", employmentType: "Fixed" },
  { id: "EMP1003", empId: "EMP1003", name: "Rohan Iyer", department: null, vertical: "Operations", licenceType: "E1", itAsset: "Standard Laptop", employmentType: "Fixed" },
  { id: "EMP1004", empId: "EMP1004", name: "Priya Nair", department: null, vertical: "Human Resources", licenceType: "E3", itAsset: "Standard Laptop", employmentType: "Fixed" },
  { id: "EMP1005", empId: "EMP1005", name: "Kabir Desai", department: null, vertical: "Supply Chain", licenceType: "E1", itAsset: "Standard Laptop", employmentType: "Fixed" },
  { id: "EMP1006", empId: "EMP1006", name: "Ananya Rao", department: null, vertical: "Sales", licenceType: "E1", itAsset: "Standard Laptop", employmentType: "Fixed" },
  { id: "EMP1007", empId: "EMP1007", name: "Vikram Sethi", department: null, vertical: "Technology", licenceType: "E3", itAsset: "Standard Laptop", employmentType: "Fixed" },
  { id: "EMP1008", empId: "EMP1008", name: "Isha Kapoor", department: null, vertical: "Finance", licenceType: "E1", itAsset: "Standard Laptop", employmentType: "Fixed" },
  { id: "EMP1009", empId: "EMP1009", name: "Dev Malhotra", department: null, vertical: "Operations", licenceType: "E1", itAsset: "Standard Laptop", employmentType: "Variable" },
  { id: "EMP1010", empId: "EMP1010", name: "Meera Joshi", department: null, vertical: "Sales", licenceType: "E3", itAsset: "Standard Laptop", employmentType: "Variable" },
];

export const DEPARTMENT_OPTIONS = Array.from(
  new Set(EMPLOYEE_DIRECTORY.map((item) => item.department).filter((value): value is string => Boolean(value))),
);

export const VERTICAL_OPTIONS = Array.from(new Set(EMPLOYEE_DIRECTORY.map((item) => item.vertical)));

export const LICENCE_TYPE_OPTIONS: Array<EmployeeRecord["licenceType"]> = ["E1", "E3"];

export const TOTAL_EMPLOYEES = EMPLOYEE_DIRECTORY.length;
export const FIXED_EMPLOYEES = EMPLOYEE_DIRECTORY.filter((item) => item.employmentType === "Fixed").length;
export const VARIABLE_EMPLOYEES = EMPLOYEE_DIRECTORY.filter((item) => item.employmentType === "Variable").length;
