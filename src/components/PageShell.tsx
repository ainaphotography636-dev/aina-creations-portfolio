"use client";

import { Header } from "@/components/Header";
import { RouteGuard } from "@/components/RouteGuard";
import { Flex } from "@once-ui-system/core";
import { usePathname } from "next/navigation";

type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  const pathname = usePathname() ?? "";
  const isHome = pathname === "/";

  return (
    <>
      {!isHome && <Flex fillWidth minHeight="16" s={{ hide: true }} />}
      {!isHome && <Header />}
      <Flex zIndex={0} fillWidth padding={isHome ? "0" : "l"} horizontal="center" flex={1}>
        <Flex horizontal="center" fillWidth minHeight="0">
          <RouteGuard>{children}</RouteGuard>
        </Flex>
      </Flex>
    </>
  );
}
