import Link from "next/link";
import * as React from "react";

import { AbarrotiaLogo } from "@/components/composed/layouts/abarrotia-logo";
import { MainNav } from "@/components/composed/layouts/main-nav";
import { SecondaryNav } from "@/components/composed/layouts/secondary-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserNav } from "@/features/profile/components/user-nav";
import { getCurrentSession } from "@/lib/session";

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = await getCurrentSession();

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
              render={
                <Link href="/checkout">
                  <AbarrotiaLogo />
                </Link>
              }></SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <MainNav />
        <SecondaryNav className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <UserNav user={session?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
