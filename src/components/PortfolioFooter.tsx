"use client";

import { Footer } from "@/components/Footer";
import { usePathname } from "next/navigation";

export function PortfolioFooter() {
  const pathname = usePathname() ?? "";

  if (pathname === "/") {
    return null;
  }

  return <Footer />;
}
