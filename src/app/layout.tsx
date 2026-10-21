import type { Metadata } from "next";
import { Georama } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { AuthProvider } from "@/features/auth/context/AuthContext";

const georama = Georama({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-georama",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IT Allocation Portal",
  description: "Manage IT asset allocation and employee records",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={georama.variable}>
      <body>
        <ThemeRegistry>
          <AuthProvider>{children}</AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
