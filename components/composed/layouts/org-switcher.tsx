"use client";

import { IconCashRegister, IconCheck, IconSelector } from "@tabler/icons-react";
import { Organization } from "better-auth/plugins";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useSwitchOrganization } from "@/features/organizations/hooks/use-switch-organization";

interface Props {
  organizations: Organization[];
  activeOrganizationId?: string | null;
}

export function OrgSwitcher({ organizations, activeOrganizationId }: Readonly<Props>) {
  const { onSwitchOrganization, isPending } = useSwitchOrganization();

  const activeOrganization = organizations.find((org) => org.id === activeOrganizationId) ?? organizations[0];

  if (organizations.length <= 1) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
            render={<Link href="/checkout" />}>
            <Avatar className="h-8 w-8 rounded-lg">
              {activeOrganization?.logo ? (
                <AvatarImage src={activeOrganization.logo} alt={activeOrganization.name} />
              ) : (
                <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <IconCashRegister className="size-4" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium text-pretty">{activeOrganization?.name ?? "Abarrotia"}</span>
              <span className="truncate text-xs text-muted-foreground">Tu Punto de Venta</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              />
            }>
            <Avatar className="h-8 w-8 rounded-lg">
              {activeOrganization?.logo ? (
                <AvatarImage src={activeOrganization.logo} alt={activeOrganization.name} />
              ) : (
                <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <IconCashRegister className="size-4" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{activeOrganization?.name ?? "Abarrotia"}</span>
              <span className="truncate text-xs text-muted-foreground">Tu Punto de Venta</span>
            </div>
            <IconSelector className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              {organizations.map((org) => (
                <DropdownMenuItem key={org.id} disabled={isPending} onClick={() => onSwitchOrganization(org.id)}>
                  <Avatar className="h-6 w-6 rounded-lg">
                    {org.logo ? (
                      <AvatarImage src={org.logo} alt={org.name} />
                    ) : (
                      <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <IconCashRegister className="size-3" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="truncate">{org.name}</span>
                  {org.id === activeOrganization?.id && (
                    <Badge variant="secondary" className="ml-auto">
                      <IconCheck className="size-3" />
                      Activa
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
