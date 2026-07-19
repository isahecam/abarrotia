import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { switchActiveOrganization } from "@/features/organizations/actions/organization.actions";
import { appToast } from "@/lib/toast";

export const useSwitchOrganization = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSwitchOrganization = (organizationId: string) => {
    startTransition(async () => {
      const result = await switchActiveOrganization({ organizationId });

      if (!result.success) {
        appToast.error(result.message);
        return;
      }

      router.refresh();
    });
  };

  return { onSwitchOrganization, isPending };
};
