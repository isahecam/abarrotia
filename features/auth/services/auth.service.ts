import { APIError } from "better-auth/api";
import { headers } from "next/headers";

import { AuthError } from "@/features/auth/errors/auth-error";
import { mapBetterAuthError } from "@/features/auth/errors/map-api-error";
import { SignIn } from "@/features/auth/schemas/auth.schema";
import { auth } from "@/lib/auth";
import { err, ok, Result } from "@/lib/errors/result";

class AuthService {
  async signIn(credentials: SignIn): Promise<Result<AuthError, void>> {
    try {
      await auth.api.signInEmail({
        body: {
          email: credentials.email,
          password: credentials.password,
          callbackURL: "/",
        },
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

export const authService = new AuthService();
