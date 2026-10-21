import { mockUsers } from "../data/mockUsers";
import type { AuthSession, LoginCredentials } from "../types";

const MOCK_LATENCY_MS = 600;

function createToken(userId: string): string {
  return `mock-token.${userId}.${Date.now()}`;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function login(credentials: LoginCredentials): Promise<AuthSession> {
  const normalizedEmail = credentials.email.trim().toLowerCase();
  if (!normalizedEmail || !credentials.password.trim()) {
    throw new Error("Email and password are required.");
  }

  await wait(MOCK_LATENCY_MS);

  const existingUser = mockUsers.find(
    (user) => user.email.toLowerCase() === normalizedEmail,
  );
  const name = normalizedEmail
    .split("@")[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  const user = existingUser ?? {
    id: `u-${normalizedEmail}`,
    name: name || normalizedEmail,
    email: normalizedEmail,
    role: "Employee" as const,
  };

  return {
    user,
    token: createToken(user.id),
  };
}
