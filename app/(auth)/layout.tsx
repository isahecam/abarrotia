import Link from "next/link";

import { AbarrotiaLogo } from "@/components/composed/layouts/abarrotia-logo";
import { CurrentYearLabel } from "@/components/composed/layouts/current-year-label";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <main className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center">
          <AbarrotiaLogo />
        </Link>
        {children}
        <span className="text-center text-xs text-muted-foreground">
          <CurrentYearLabel /> Abarrotia. Todos los derechos reservados.
        </span>
      </main>
    </div>
  );
}
