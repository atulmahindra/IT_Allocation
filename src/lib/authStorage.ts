import Cookies from "js-cookie";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_EXPIRY_DAYS, AUTH_USER_STORAGE_KEY } from "@/constants/auth";
import type { AuthUser } from "@/features/auth/types";

export function persistSession(token: string, user: AuthUser): void {
  Cookies.set(AUTH_COOKIE_NAME, token, {
    expires: AUTH_COOKIE_EXPIRY_DAYS,
    sameSite: "lax",
  });

  if (typeof window !== "undefined") {
    window.localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
  }
}

export function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(AUTH_USER_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  Cookies.remove(AUTH_COOKIE_NAME);
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
  }
}
