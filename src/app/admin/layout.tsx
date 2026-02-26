"use client";

import { AdminProvider } from "@/components/admin-provider";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminProvider>{children}</AdminProvider>;
}
