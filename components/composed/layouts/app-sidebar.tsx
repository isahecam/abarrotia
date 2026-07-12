"use client";

import { IconCash, IconChartBar, IconPackage, IconPackages, IconReceipt, IconSettings } from "@tabler/icons-react";
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Cobro",
      url: "/checkout",
      icon: IconCash,
    },
    {
      title: "Productos",
      url: "/products",
      icon: IconPackage,
    },
    {
      title: "Inventario",
      url: "#",
      icon: IconPackages,
    },
    {
      title: "Ventas",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Corte de caja",
      url: "#",
      icon: IconReceipt,
    },
  ],

  navSecondary: [
    {
      title: "Ajustes",
      url: "/settings",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <MainNav items={data.navMain} />
        <SecondaryNav items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <UserNav user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
