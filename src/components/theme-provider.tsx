"use client";
import { ThemeProvider as Provider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <Provider defaultTheme="light">{children}</Provider>;
}
