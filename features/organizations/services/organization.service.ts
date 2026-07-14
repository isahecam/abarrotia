import { APIError } from "better-auth/api";
import { headers } from "next/headers";

import { mapBetterAuthError } from "@/features/organizations/errors/map-api-error";
import { OrganizationError } from "@/features/organizations/errors/organization-error";
import { SwitchOrganization } from "@/features/organizations/schemas/organization.schema";
import { auth } from "@/lib/auth";
import { err, ok, Result } from "@/lib/errors/result";

class OrganizationService {
  async setActive({ organizationId }: SwitchOrganization): Promise<Result<OrganizationError, void>> {
    try {
      await auth.api.setActiveOrganization({
        body: { organizationId },
        headers: await headers(),
      });
      return ok(undefined);
    } catch (error) {
      if (error instanceof APIError) {
        return err(mapBetterAuthError(error));
      }
      return err({ reason: "UNEXPECTED_ERROR" as const });
    }
  }
}

export const organizationService = new OrganizationService();
