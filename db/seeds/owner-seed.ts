import { config } from "dotenv";
config({ path: ".env.development" });
import { auth } from "@/lib/auth";

async function main() {
  console.log("🚀 Creando al Dueño del Sistema...");

  const ownerUser = await auth.api.signUpEmail({
    body: {
      name: "Dueño del Sistema",
      email: process.env.NEW_OWNER_EMAIL!,
      password: process.env.NEW_OWNER_PASSWORD!,
    },
  });

  if (!ownerUser) return console.error("❌ Error al crear usuario.");

  await auth.api.createOrganization({
    body: {
      name: "Abarrotes Tienda de la Esquina",
      slug: "abarrotes-tienda-de-la-esquina",
      userId: ownerUser.user.id,
    },
  });

  console.log("✅ Dueño listo para loguearse sin verificar nada.");
}

main().catch(console.error);
