"use client";

import * as React from "react";
import { LayoutDashboard } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { NavMain } from "@/components/custom/dashboard/nav-main";
import { NavSecondary } from "@/components/custom/dashboard/nav-secondary";
import { NavUser } from "@/components/custom/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { data } from "./sidebar-data";
import { SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function AppSidebar({ admin, user, ...props }) {
  const { isMobile, state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      {isMobile && (
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Application navigation menu containing links to different sections
            of the application
          </SheetDescription>
        </VisuallyHidden>
      )}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              tooltip={isCollapsed ? "StockX" : undefined}
            >
              <a
                href="/"
                className={cn(
                  "flex items-center",
                  isCollapsed && !isMobile && "justify-center"
                )}
              >
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <LayoutDashboard
                    size={18}
                    className="text-primary-foreground"
                  />
                </div>
                <span
                  className={cn(
                    "ml-2 font-semibold",
                    !isMobile && isCollapsed && "hidden"
                  )}
                >
                  StockX
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {admin ? (
          <NavMain items={data.adminMain} />
        ) : (
          <>
            <NavMain items={data.navMain} />
            <NavSecondary items={data.navSecondary} className="mt-auto" />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
