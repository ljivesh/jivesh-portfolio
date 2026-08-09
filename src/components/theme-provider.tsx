"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="amber"
      themes={["amber", "green"]}
      enableSystem={false}
      disableTransitionOnChange
      storageKey="menma-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
