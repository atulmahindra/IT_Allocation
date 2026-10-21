"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { login as loginRequest } from "../services/authService";
import { persistSession, readStoredUser, clearSession } from "@/lib/authStorage";
import { LOGIN_PATH } from "@/constants/auth";
import type { AuthUser, LoginCredentials } from "../types";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  isSubmitting: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [isInitializing, setIsInitializing] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Deferred to an effect (not a lazy useState initializer) so the server-rendered
    // markup and the client's first paint agree before localStorage is read.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(readStoredUser());
    setIsInitializing(false);
  }, []);

  const login = React.useCallback(async (credentials: LoginCredentials) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const session = await loginRequest(credentials);
      persistSession(session.token, session.user);
      setUser(session.user);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to sign in.";
      setError(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const logout = React.useCallback(() => {
    clearSession();
    setUser(null);
    router.replace(LOGIN_PATH);
  }, [router]);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitializing,
      isSubmitting,
      error,
      login,
      logout,
    }),
    [user, isInitializing, isSubmitting, error, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
