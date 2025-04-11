import { cookies } from "next/headers";

import { AppSidebar } from "@/components/custom/dashboard/app-sidebar";
import {
  SidebarInset,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { auth } from "../(auth)/auth";

export default async function Layout({ children }) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);

  return (
    <SidebarProvider >
      <AppSidebar admin={true} user={session?.user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
