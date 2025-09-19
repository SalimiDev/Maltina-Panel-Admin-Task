"use client";

import { getQueryClient } from "@/utils/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const client = getQueryClient();

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
