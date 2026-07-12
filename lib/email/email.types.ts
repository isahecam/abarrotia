import { ReactElement } from "react";

export interface SendEmailParams {
  to: string;
  subject: string;
  react: ReactElement;
  from: string;
}

export interface EmailProvider {
  send(params: SendEmailParams): Promise<void>;
}
