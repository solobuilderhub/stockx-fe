"use client";

import * as React from "react";
import { Box, Building, ReceiptText } from "lucide-react";
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

export function AppSidebar({ admin, user, ...props }) {
  const { isMobile, state } = useSidebar();

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
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="text-lg font-bold flex items-center gap-2">
                  {/* <img src="/brihoteng_logo.svg" alt="Directory Hub Logo" /> */}
                  <Box />
                  Halal Eats
                </div>
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
