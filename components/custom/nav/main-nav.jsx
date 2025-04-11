"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav({ displayInSidebar = false }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Start Selling", href: "/seller/benefits" },
  ];

  return (
    <nav className={cn(
      "flex font-mono",
      displayInSidebar ? "flex-col gap-3" : "gap-1"
    )}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || 
          (item.href !== '/' && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative transition-all duration-200",
              displayInSidebar
                ? "px-3 py-2 rounded-md hover:bg-retro-secondary/10"
                : "px-4 py-2 rounded-md hover:bg-retro-secondary/10",
              isActive
                ? "font-bold text-retro-primary"
                : "text-foreground/80 hover:text-foreground"
            )}
          >
            {item.name}
            {isActive && !displayInSidebar && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 bg-retro-secondary w-2/3 rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}