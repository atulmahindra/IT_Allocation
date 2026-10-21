import type { ReactNode } from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
