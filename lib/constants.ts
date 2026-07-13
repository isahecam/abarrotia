import {
  Icon,
  IconCash,
  IconChartBar,
  IconPackage,
  IconPackages,
  IconReceipt,
  IconSettings,
} from "@tabler/icons-react";
import { Route } from "next";

type NavItem = {
  title: string;
  url: Route;
  icon: Icon;
};

const MAIN_NAV_ITEMS: NavItem[] = [
  { title: "Cobro", url: "/checkout", icon: IconCash },
  { title: "Productos", url: "#", icon: IconPackage },
  { title: "Inventario", url: "#", icon: IconPackages },
  { title: "Ventas", url: "#", icon: IconChartBar },
  { title: "Corte de caja", url: "#", icon: IconReceipt },
];

const SECONDARY_NAV_ITEMS: NavItem[] = [{ title: "Ajustes", url: "#", icon: IconSettings }];

export { MAIN_NAV_ITEMS, SECONDARY_NAV_ITEMS };
