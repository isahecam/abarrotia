import { headers } from "next/headers";

import { auth } from "./auth";

export async function getOrganizations() {
  const organizations = await auth.api.listOrganizations({
    headers: await headers(),
  });

  return organizations;
}
