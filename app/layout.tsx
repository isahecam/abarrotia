import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Abarrotia - Tu Punto de Venta",
    default: "Abarrotia - Tu Punto de Venta",
  },
  description:
    "Abarrotia es un sistema de punto de venta diseñado para tiendas de abarrotes, ofreciendo una solución completa para la gestión de inventario, ventas y clientes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("h-full", "antialiased", geistMono.variable, "font-sans", geist.variable)}>
      <body className="flex min-h-full flex-col">
        <NuqsAdapter>
          <TooltipProvider>{children}</TooltipProvider>
        </NuqsAdapter>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
