import * as React from "react";

import { MainNav } from "@/components/composed/layouts/main-nav";
import { OrgSwitcher } from "@/components/composed/layouts/org-switcher";
import { SecondaryNav } from "@/components/composed/layouts/secondary-nav";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { UserNav } from "@/features/profile/components/user-nav";
import { getOrganizations } from "@/lib/organization";
import { getCurrentSession } from "@/lib/session";

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [session, organizations] = await Promise.all([getCurrentSession(), getOrganizations()]);

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <OrgSwitcher organizations={organizations} activeOrganizationId={session?.session.activeOrganizationId} />
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
