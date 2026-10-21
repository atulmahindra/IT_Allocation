import { getAllEmployees } from "@/features/employees/services/employeeService";
import type { Employee } from "@/features/employees/types";

export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  departmentCount: number;
}

export interface DepartmentBreakdown {
  department: string;
  count: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const employees = await getAllEmployees();
  const activeEmployees = employees.filter((employee) => employee.status === "Active").length;
  const departmentCount = new Set(employees.map((employee) => employee.department)).size;

  return {
    totalEmployees: employees.length,
    activeEmployees,
    inactiveEmployees: employees.length - activeEmployees,
    departmentCount,
  };
}

export async function getDepartmentBreakdown(): Promise<DepartmentBreakdown[]> {
  const employees = await getAllEmployees();
  const counts = new Map<string, number>();
  for (const employee of employees) {
    counts.set(employee.department, (counts.get(employee.department) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([department, count]) => ({ department, count }));
}

export async function getRecentEmployees(limit = 5): Promise<Employee[]> {
  const employees = await getAllEmployees();
  return [...employees].sort((a, b) => b.joinDate.localeCompare(a.joinDate)).slice(0, limit);
}
