"use client";

import { UserNav } from "./user-nav";

import { cn } from "@/lib/utils";

export function NavbarIcons({
  user,
  cartCount = 0,
  isLoading,
  isSeller,
  isAdmin,
  className
}) {
  return (
    <div className={cn("flex items-center gap-3 md:gap-4", className)}>
      {/* Cart button */}
   

      {/* User menu */}
      <div className="flex items-center">
        <UserNav user={user} isSeller={isSeller} isAdmin={isAdmin} />
      </div>
    </div>
  );
}
