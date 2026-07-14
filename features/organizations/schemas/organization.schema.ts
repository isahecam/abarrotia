import { z } from "zod";

export const switchOrganizationSchema = z.object({
  organizationId: z.string(),
});

export type SwitchOrganization = z.infer<typeof switchOrganizationSchema>;
