import { Resend } from "resend";

import { EmailService } from "./email.service";
import { ResendProvider } from "./providers/resend.provider";

let emailService: EmailService | null = null;

export function getEmailService() {
  if (!emailService) {
    const client = new Resend(process.env.RESEND_API_KEY!);
    const provider = new ResendProvider(client);

    emailService = new EmailService(provider);
  }

  return emailService;
}
