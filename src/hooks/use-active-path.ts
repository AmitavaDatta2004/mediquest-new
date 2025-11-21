
"use client";

import { usePathname } from "next/navigation";
import { useCallback } from "react";

export function useActivePath(): (path: string) => boolean {
  const pathname = usePathname();

  const checkActivePath = useCallback(
    (path: string) => {
      if (path === "/#features" || path === "/#team") {
        return false; // Anchor links on the homepage shouldn't be "active"
      }
      return pathname === path;
    },
    [pathname]
  );

  return checkActivePath;
}
