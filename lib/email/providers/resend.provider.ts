import { Resend } from "resend";

import { EmailProvider, SendEmailParams } from "@/lib/email/email.types";
import { InfraError } from "@/lib/errors/errors";

export class ResendProvider implements EmailProvider {
  constructor(private readonly client: Resend) {}

  async send({ from, to, subject, react }: SendEmailParams) {
    const { error } = await this.client.emails.send({
      from,
      to,
      subject,
      react,
    });

    if (error) throw new InfraError("EMAIL", error.message);
  }
}
