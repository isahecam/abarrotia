"use server";

import { z } from "zod";

import { ORGANIZATION_ERROR_MESSAGES } from "@/features/organizations/errors/messages";
import { switchOrganizationSchema, SwitchOrganization } from "@/features/organizations/schemas/organization.schema";
import { organizationService } from "@/features/organizations/services/organization.service";
import { ActionResult } from "@/lib/errors/action-result";

export async function switchActiveOrganization(input: SwitchOrganization): Promise<ActionResult> {
  const parsed = switchOrganizationSchema.safeParse(input);

  if (!parsed.success)
    return {
      success: false,
      reason: "VALIDATION_ERROR",
      message: "Organización inválida.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };

  const [error] = await organizationService.setActive(parsed.data);

  if (error)
    return {
      success: false,
      reason: error.reason,
      message: ORGANIZATION_ERROR_MESSAGES[error.reason],
    };

  return { success: true, data: undefined };
}
