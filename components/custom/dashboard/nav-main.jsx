'use client'

import { ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"


export function NavMain({ items }) {
  const pathname = usePathname();
  const { state } = useSidebar();

  // Function to check for exact match
  const isActiveExact = (url) => pathname === url

  // Function to check if the current path starts with the given URL
  const isActivePartial = (url) => {
    if (url === '/dashboard') {
      return pathname === url
    }
    return pathname === url || pathname.startsWith(`${url}/`)
  }

  return (
    <>
      {items.map((groupItem) => (
        <SidebarGroup key={groupItem.title}>
          <SidebarGroupLabel>
            {groupItem.title}
          </SidebarGroupLabel>
          <SidebarMenu>
            {groupItem.items.map((item) => (
              <Collapsible key={item.title} asChild defaultOpen={isActivePartial(item.url)}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip={state === "collapsed" ? item.title : undefined}
                    isActive={isActiveExact(item.url)}
                  >
                    <Link href={item.url}>
                      {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.items && item.items.length > 0 && (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="transition-transform duration-200 data-[state=open]:rotate-90">
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">Toggle {item.title} submenu</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActiveExact(subItem.url)}
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}