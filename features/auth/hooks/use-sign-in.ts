import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { signIn } from "@/features/auth/actions/auth.actions";
import { SignIn, signInSchema } from "@/features/auth/schemas/auth.schema";
import { appToast } from "@/lib/toast";

export const useSignIn = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: SignIn) => {
    const result = await signIn(data);

    if (!result.success) {
      appToast.error(result.message);
      return;
    }

    router.refresh();
    router.replace("/checkout");
  };

  return { control, handleSubmit, onSubmit, isSubmitting };
};
