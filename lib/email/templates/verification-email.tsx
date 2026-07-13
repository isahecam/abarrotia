import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
  render,
  toPlainText,
} from "react-email";

import { getYear } from "@/utils/format-date";

interface Props {
  name: string;
  verificationUrl: string;
  tokenExpiresIn: string;
}

export default function VerificationEmail({ name, verificationUrl, tokenExpiresIn }: Readonly<Props>) {
  const currentYear = getYear(new Date());

  return (
    <Tailwind>
      <Html>
        <Head>
          <title>Bienvenido a Abarrotia, Tu Punto de Venta</title>
        </Head>
        <Body className="bg-white font-sans">
          <Preview>Bienvenido a Abarrotia, Tu Punto de Venta</Preview>
          <Container className="border border-solid border-gray-200 bg-white p-8">
            <Heading className="mt-12 text-[28px] font-bold">Verifica tu correo para activar tu cuenta</Heading>

            <Text className="mt-4 text-sm">
              Hola {name}, gracias por unirte a Abarrotia. Haz clic en el botón de abajo para verificar tu cuenta.
            </Text>

            <Section>
              <Button
                href={verificationUrl}
                className="cursor-pointer rounded-full bg-emerald-700 px-6 py-3 text-center font-semibold text-emerald-50 no-underline">
                Verificar cuenta
              </Button>
              <Text className="text-sm text-gray-500">Si no creaste una cuenta, ignora este correo electrónico.</Text>
            </Section>

            <Hr className="border-gray-400" />

            <Text className="text-sm">
              Si tienes problemas para hacer clic en el botón, copia y pega el siguiente enlace en tu navegador:
            </Text>

            <Text className="text-sm">
              <Link href={verificationUrl} className="break-all text-emerald-700 underline">
                {verificationUrl}
              </Link>
            </Text>

            <Text className="mt-6 text-sm text-gray-500">
              Este enlace expirará en <strong className="font-bold">{tokenExpiresIn}</strong>.
            </Text>

            <Text className="text-sm text-gray-500 italic">El equipo de Abarrotia</Text>

            <Hr className="mt-12 border-gray-400" />

            <Section className="text-center">
              <Text className="m-0 text-xs text-gray-500">{currentYear} Abarrotia, Tu Punto de Venta</Text>
              <Text className="m-0 text-xs leading-6 text-gray-500">Rafael Lara Grajales, Puebla</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

export async function renderVerificationEmailText(props: Props) {
  const html = await render(<VerificationEmail {...props} />);
  const text = toPlainText(html);
  return { text };
}
