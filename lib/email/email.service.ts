import { emailConfig } from "@/lib/email/email.config";
import { EmailProvider } from "@/lib/email/email.types";
import PasswordResetEmail from "@/lib/email/templates/password-reset-email";
import VerificationEmail from "@/lib/email/templates/verification-email";

export class EmailService {
  constructor(private readonly provider: EmailProvider) {}

  async sendVerificationEmail(name: string, email: string, verificationUrl: string) {
    return this.provider.send({
      from: emailConfig.from.verification,
      to: email,
      subject: "Verifica tu correo electrónico",
      react: VerificationEmail({ name, verificationUrl, tokenExpiresIn: emailConfig.tokenExpiration }),
    });
  }

  async sendPasswordResetEmail(name: string, email: string, resetUrl: string) {
    return this.provider.send({
      from: emailConfig.from.passwordReset,
      to: email,
      subject: "Restablece tu contraseña",
      react: PasswordResetEmail({ name, resetUrl, tokenExpiresIn: emailConfig.tokenExpiration }),
    });
  }
}
