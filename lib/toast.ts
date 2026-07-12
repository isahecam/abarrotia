// lib/toast.ts

import { toast } from "sonner";

export const appToast = {
  action(result: { success: boolean; message?: string }) {
    if (!result.message) return;

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  },

  success(message: string) {
    toast.success(message);
  },

  error(message: string) {
    toast.error(message);
  },

  info(message: string) {
    toast.info(message);
  },

  warning(message: string) {
    toast.warning(message);
  },
};
