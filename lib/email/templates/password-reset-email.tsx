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
  resetUrl: string;
  tokenExpiresIn: string;
}

export default function PasswordResetEmail({ name, resetUrl, tokenExpiresIn }: Readonly<Props>) {
  const currentYear = getYear(new Date());

  return (
    <Tailwind>
      <Html lang="es">
        <Head>
          <title>Restablece tu contraseña</title>
        </Head>
        <Body className="bg-white font-sans">
          <Preview>Restablece tu contraseña</Preview>
          <Container className="border border-solid border-gray-200 bg-white p-8">
            <Heading className="mt-12 text-[28px] font-bold">Restablece tu contraseña para acceder a tu cuenta</Heading>

            <Text className="mt-4 text-sm">
              Hola {name}, hemos recibido una solicitud para restablecer la contraseña de tu cuenta de Abarrotia. Haz
              clic en el botón de abajo para continuar con el proceso.
            </Text>

            <Section>
              <Button
                href={resetUrl}
                className="btn-reset-password rounded-md bg-emerald-700 px-6 py-3 text-center font-semibold text-emerald-50 no-underline">
                Restablecer contraseña
              </Button>
              <Text className="text-sm text-gray-500">
                Si no solicitaste esto, por favor ignora este correo electrónico.
              </Text>
            </Section>

            <Hr className="border-gray-400" />

            <Text className="text-sm">
              Si tienes problemas para hacer clic en el botón, copia y pega el siguiente enlace en tu navegador:
            </Text>

            <Text className="text-sm">
              <Link href={resetUrl} className="wrap-break-word text-emerald-700 underline">
                {resetUrl}
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

export async function renderPasswordResetEmailText(props: Props) {
  const html = await render(<PasswordResetEmail {...props} />);
  const text = toPlainText(html);
  return { text };
}
