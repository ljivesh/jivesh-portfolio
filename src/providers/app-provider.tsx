"use client";

import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "@/components/theme-provider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider><QueryProvider>{children}</QueryProvider></ThemeProvider>;
}
