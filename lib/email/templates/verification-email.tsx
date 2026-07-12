import {
  Html,
  Button,
  Head,
  Preview,
  Hr,
  Tailwind,
  Container,
  Section,
  Body,
  Heading,
  Text,
  Img,
  toPlainText,
  render,
} from "react-email";

interface Props {
  name: string;
  verificationUrl: string;
  tokenExpiresIn: string;
}

export function VerificationEmail({ name, verificationUrl, tokenExpiresIn }: Readonly<Props>) {
  const currentYear = new Date().getFullYear();

  return (
    <Html lang="es">
      <Head>
        <title>Bienvenido a Abarrotia, Tu Punto de Venta</title>
      </Head>
      <Preview>Verifica tu cuenta para comenzar a usar Abarrotia</Preview>

      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-8 max-w-150 rounded-lg bg-white">
            <Section className="p-8 text-center">
              <Img
                src="https://valentines-day-app.vercel.app/liebe-verbindet.webp"
                alt="Abarrotia"
                width={120}
                className="mx-auto aspect-auto object-contain"
              />
            </Section>

            <Section className="px-8 pb-8">
              <Heading className="mb-4 text-2xl font-bold text-gray-900">Verifica tu cuenta</Heading>

              <Text className="mb-6 text-base leading-6 text-gray-600">
                Hola {name}, gracias por ser parte de Abarrotia. Haz clic en el enlace de abajo para verificar tu
                cuenta.
              </Text>

              <Section className="my-8 text-center">
                <Button href={verificationUrl} className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white">
                  Verificar cuenta
                </Button>
                <Text className="text-sm text-gray-400">El enlace expirará en {tokenExpiresIn}.</Text>
              </Section>
            </Section>

            <Hr className="my-4 border-gray-200" />

            <Section className="px-8 pb-8 text-center">
              <Text className="text-sm text-gray-400">Si no creaste una cuenta, ignora este mensaje.</Text>
              <Text className="text-xs text-gray-400">©{currentYear} Abarrotia</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export async function renderVerificationEmailText(props: Props) {
  const html = await render(<VerificationEmail {...props} />);
  const text = toPlainText(html);
  return { text };
}
