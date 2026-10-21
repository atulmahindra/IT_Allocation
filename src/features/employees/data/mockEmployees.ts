import type { Employee } from "../types";

const FIRST_NAMES = [
  "Aarav", "Diya", "Vihaan", "Ananya", "Reyansh", "Ishita", "Kabir", "Myra",
  "Arjun", "Saanvi", "Vivaan", "Aadhya", "Rohan", "Kavya", "Dhruv", "Priya",
  "Sai", "Meera", "Karthik", "Riya", "Nikhil", "Tara", "Aditya", "Sneha",
  "Yash", "Pooja", "Harsh", "Neha", "Varun", "Isha",
];

const LAST_NAMES = [
  "Sharma", "Verma", "Gupta", "Mehta", "Iyer", "Nair", "Reddy", "Kapoor",
  "Singh", "Patel", "Bose", "Chopra", "Malhotra", "Pillai", "Rao",
];

const DEPARTMENTS = [
  "Engineering", "IT Support", "Human Resources", "Finance", "Operations", "Sales",
] as const;

const DESIGNATIONS_BY_DEPARTMENT: Record<string, string[]> = {
  Engineering: ["Software Engineer", "Senior Engineer", "Engineering Manager", "QA Engineer"],
  "IT Support": ["IT Technician", "Support Analyst", "IT Administrator"],
  "Human Resources": ["HR Executive", "HR Manager", "Talent Acquisition Specialist"],
  Finance: ["Accountant", "Financial Analyst", "Finance Manager"],
  Operations: ["Operations Executive", "Operations Manager"],
  Sales: ["Sales Executive", "Account Manager", "Sales Lead"],
};

const LOCATIONS = ["Bengaluru", "Hyderabad", "Pune", "Mumbai", "Delhi NCR", "Chennai"];

const EMPLOYEE_COUNT = 42;

function pad(num: number, size: number): string {
  return String(num).padStart(size, "0");
}

// Deterministic hash so date/status fields don't line up with the department's
// `index % DEPARTMENTS.length` cycle (which previously clustered all "recent
// hires" into a single department).
function hash(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function buildEmployee(index: number): Employee {
  const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
  const lastName = LAST_NAMES[index % LAST_NAMES.length];
  const department = DEPARTMENTS[index % DEPARTMENTS.length];
  const designations = DESIGNATIONS_BY_DEPARTMENT[department];
  const designation = designations[index % designations.length];
  const location = LOCATIONS[index % LOCATIONS.length];
  const status = hash(index + 0.7) < 0.2 ? "Inactive" : "Active";

  const joinYear = 2019 + Math.floor(hash(index + 0.1) * 6);
  const joinMonth = pad(1 + Math.floor(hash(index + 0.2) * 12), 2);
  const joinDay = pad(1 + Math.floor(hash(index + 0.3) * 27), 2);

  const name = `${firstName} ${lastName}`;
  const employeeCode = `EMP${pad(index + 1, 4)}`;

  return {
    id: employeeCode,
    employeeCode,
    name,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@itportal.com`,
    phone: `+91 9${pad((index * 7919) % 1000000000, 9)}`,
    department,
    designation,
    location,
    status,
    joinDate: `${joinYear}-${joinMonth}-${joinDay}`,
  };
}

export const mockEmployees: Employee[] = Array.from({ length: EMPLOYEE_COUNT }, (_, index) =>
  buildEmployee(index),
);

export const DEPARTMENT_OPTIONS = DEPARTMENTS;
