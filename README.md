# Regalos para Frijolito (Cloudflare Pages + Functions + D1)

## Estructura
- `index.html` — frontend
- `functions/api/regalos.js` — GET lista de regalos y estado
- `functions/api/reservar.js` — POST reservar (bloqueo atómico vía PRIMARY KEY)
- `schema.sql` — tablas + 9 regalos
- `wrangler.toml` — config Pages + binding D1 `DB`

## Despliegue
1. `npm i -g wrangler` (o usar `npx wrangler`) y `npx wrangler login`
2. `npx wrangler d1 create bebe-regalos` → copiar `database_id` a `wrangler.toml`
3. `npx wrangler d1 execute bebe-regalos --remote --file=schema.sql`
4. Subir a GitHub y en Cloudflare: Workers & Pages → Create → Pages → Connect to Git
   (build command: vacío; output directory: `/`)
5. Settings → Bindings → D1 database: variable `DB` → `bebe-regalos`
6. Redeploy.

## Local
`npx wrangler d1 execute bebe-regalos --local --file=schema.sql`
`npx wrangler pages dev . --d1=DB=bebe-regalos`

## Ver reservas
`npx wrangler d1 execute bebe-regalos --remote --command "SELECT g.nombre, r.nombres, r.creado_en FROM reservas r JOIN regalos g ON g.id=r.regalo_id"`

## Liberar un regalo
`npx wrangler d1 execute bebe-regalos --remote --command "DELETE FROM reservas WHERE regalo_id=3"`
