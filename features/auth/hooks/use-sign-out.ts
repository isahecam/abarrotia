import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { signOut } from "@/features/auth/actions/auth.actions";
import { appToast } from "@/lib/toast";

export const useSignOut = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSignOut = () => {
    startTransition(async () => {
      const result = await signOut();

      if (!result.success) {
        appToast.error(result.message);
        return;
      }

      router.refresh();
      router.replace("/sign-in");
    });
  };

  return { onSignOut, isPending };
};
