# Abarrotia | Tu Punto de Venta

Abarrotia es un sistema de punto de venta (POS) pensado para pequeñas tiendas de abarrotes. Permite
gestionar ventas, caja e inventario desde una interfaz simple.

## Cómo levantar el proyecto

### Requisitos previos

- Node.js 20+
- pnpm
- Docker (para la base de datos local)

### Pasos

1. Instalar dependencias:

   ```bash
   pnpm install
   ```

2. Levantar Postgres y pgAdmin en local con Docker Compose. El volumen `abarrotia-data` debe existir antes
   de levantar los contenedores:

   ```bash
   docker volume create abarrotia-data
   docker compose -f compose.dev.yaml up -d
   ```

3. Copiar `.env.example` a `.env.development` y completar las variables (ver sección siguiente).

4. Iniciar el servidor de desarrollo:

   ```bash
   pnpm dev
   ```

   La aplicación quedará disponible en [http://localhost:3000](http://localhost:3000).

5. (Opcional) Crear el usuario dueño inicial y su organización:

   ```bash
   pnpm db:seed
   ```

### Otros comandos útiles

```bash
pnpm build       # build de producción
pnpm start       # ejecutar el build de producción
pnpm lint        # revisar el código con oxlint
pnpm fmt         # formatear el código con oxfmt
```

## Variables de entorno

Ver `.env.example` para el listado completo. Las principales son:

- `BETTER_AUTH_SECRET` / `BETTER_AUTH_URL` — configuración de autenticación (better-auth).
- `RESEND_API_KEY` — envío de correos transaccionales (verificación de cuenta, etc).
- `DATABASE_URL` — cadena de conexión a la base de datos PostgreSQL.
- `POSTGRES_*` / `PGADMIN_*` — usadas únicamente por `compose.dev.yaml` para levantar la base de datos y
  pgAdmin en local.

Los valores locales viven en `.env.development` (ignorado por git).

## Arquitectura (resumen)

```
app/                # Enrutamiento
  (auth)/
  (dashboard)/
  api/
features/           # Lógica de cada funcionalidad
  auth/
  checkout/
  profile/
db/                 # Base de datos
  schemas/
  seeds/
lib/                # Utilidades transversales
  auth.ts
  auth-client.ts
  email/
  errors/
components/         # Componentes de UI
  ui/
  composed/
hooks/              # Hooks de React compartidos
proxy.ts            # Middleware de Next.js
```

Para más detalle sobre la arquitectura y convenciones internas, ver `CLAUDE.md`.
