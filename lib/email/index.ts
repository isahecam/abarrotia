import { resend } from "@/lib/resend";

import { EmailService } from "./email.service";
import { ResendProvider } from "./providers/resend.provider";

const provider = new ResendProvider(resend);

export const emailService = new EmailService(provider);
