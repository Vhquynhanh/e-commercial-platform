// components/ClientProviders.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/contexts/ThemeProvider";

export default function ClientProviders({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
}
