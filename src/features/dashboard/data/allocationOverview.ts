export interface MonthlyAllocation {
  month: string;
  fixedEmployees: number;
  variableEmployees: number;
  fixedCost: number;
  variableCost: number;
}

export const REPORTING_RANGE_LABEL = "May–October 2026";
export const SELECTED_MONTH = "October";

export const MONTHLY_ALLOCATION: MonthlyAllocation[] = [
  { month: "May", fixedEmployees: 92, variableEmployees: 12, fixedCost: 920000, variableCost: 120000 },
  { month: "June", fixedEmployees: 94, variableEmployees: 15, fixedCost: 940000, variableCost: 150000 },
  { month: "July", fixedEmployees: 96, variableEmployees: 18, fixedCost: 960000, variableCost: 180000 },
  { month: "August", fixedEmployees: 97, variableEmployees: 16, fixedCost: 970000, variableCost: 160000 },
  { month: "September", fixedEmployees: 99, variableEmployees: 19, fixedCost: 990000, variableCost: 190000 },
  { month: "October", fixedEmployees: 100, variableEmployees: 20, fixedCost: 1000000, variableCost: 200000 },
];

export const SELECTED = MONTHLY_ALLOCATION[MONTHLY_ALLOCATION.length - 1];

export const TOTAL_IT_BUDGET = 5000000;

export function formatInr(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}
