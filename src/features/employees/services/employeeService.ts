import { mockEmployees } from "../data/mockEmployees";
import type { Employee, EmployeeInput, EmployeeQueryParams, PaginatedResult } from "../types";

const MOCK_LATENCY_MS = 350;

let employeeStore: Employee[] = [...mockEmployees];

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId(): string {
  const maxCode = employeeStore.reduce((max, employee) => {
    const num = Number(employee.employeeCode.replace("EMP", ""));
    return Number.isFinite(num) ? Math.max(max, num) : max;
  }, 0);
  return `EMP${String(maxCode + 1).padStart(4, "0")}`;
}

export async function getEmployees(
  params: EmployeeQueryParams,
): Promise<PaginatedResult<Employee>> {
  await wait(MOCK_LATENCY_MS);

  const { search, department, status, page, pageSize } = params;
  const normalizedSearch = search.trim().toLowerCase();

  const filtered = employeeStore.filter((employee) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      employee.name.toLowerCase().includes(normalizedSearch) ||
      employee.email.toLowerCase().includes(normalizedSearch) ||
      employee.employeeCode.toLowerCase().includes(normalizedSearch);

    const matchesDepartment = department === "All" || employee.department === department;
    const matchesStatus = status === "All" || employee.status === status;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const start = page * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  return { data: paged, total: filtered.length };
}

export async function getEmployeeById(id: string): Promise<Employee | undefined> {
  await wait(MOCK_LATENCY_MS);
  return employeeStore.find((employee) => employee.id === id);
}

export async function createEmployee(input: EmployeeInput): Promise<Employee> {
  await wait(MOCK_LATENCY_MS);
  const newId = generateId();
  const newEmployee: Employee = { ...input, id: newId, employeeCode: newId };
  employeeStore = [newEmployee, ...employeeStore];
  return newEmployee;
}

export async function updateEmployee(id: string, input: EmployeeInput): Promise<Employee> {
  await wait(MOCK_LATENCY_MS);
  let updated: Employee | undefined;
  employeeStore = employeeStore.map((employee) => {
    if (employee.id !== id) return employee;
    updated = { ...employee, ...input, id };
    return updated;
  });

  if (!updated) {
    throw new Error("Employee not found.");
  }

  return updated;
}

export async function deleteEmployee(id: string): Promise<void> {
  await wait(MOCK_LATENCY_MS);
  employeeStore = employeeStore.filter((employee) => employee.id !== id);
}

export async function getAllEmployees(): Promise<Employee[]> {
  await wait(MOCK_LATENCY_MS);
  return employeeStore;
}
