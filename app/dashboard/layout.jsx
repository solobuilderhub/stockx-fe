import { cookies } from "next/headers";

import { AppSidebar } from "@/components/custom/dashboard/app-sidebar";
import {
  SidebarInset,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { auth } from "../(auth)/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);

  // console.log("session", session )

  return (
    <SidebarProvider>
        <AppSidebar user={session?.user} />
        <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
