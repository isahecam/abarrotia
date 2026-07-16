import * as React from "react";

import { MainNav } from "@/components/composed/layouts/main-nav";
import { OrgSwitcher } from "@/components/composed/layouts/org-switcher";
import { SecondaryNav } from "@/components/composed/layouts/secondary-nav";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { UserNav } from "@/features/profile/components/user-nav";
import { getOrganizations } from "@/lib/organization";
import { getCurrentSession } from "@/lib/session";

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [sessionResult, organizationsResult] = await Promise.allSettled([getCurrentSession(), getOrganizations()]);

  // AppSidebar renders on every dashboard route with no error boundary above it, so each
  // call is settled independently — a failure in one must not blank out the other's data.
  const session = sessionResult.status === "fulfilled" ? sessionResult.value : null;
  const organizations = organizationsResult.status === "fulfilled" ? organizationsResult.value : [];

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
