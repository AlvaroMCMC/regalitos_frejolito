# Prompt para Claude Code

Contexto: tengo este proyecto en la carpeta actual. Es una invitación de baby shower para enviar por link a varias personas. Quiero desplegarla en Cloudflare Pages (pages.dev) con backend y persistencia 100% en plan gratuito.

## Requisitos funcionales
1. Cada invitado abre el link, escribe su nombre y puede agregar acompañantes (campos extra de nombre).
2. Ve la lista de regalos (tomados de LISTA_BEBE.xlsx, ya cargados en `schema.sql`) con link "Ver modelo" cuando exista.
3. Elige UN regalo y lo reserva. Una vez reservado, queda bloqueado para todos los demás (se muestra "Ya elegido" y no se puede seleccionar).
4. El bloqueo debe ser atómico en el servidor (no solo en el front): dos personas reservando a la vez no pueden tomar el mismo regalo. Se resuelve con `regalo_id PRIMARY KEY` en la tabla `reservas` y respuesta HTTP 409 al conflicto.
5. No exponer públicamente quién reservó qué (solo "Ya elegido").

## Stack (todo gratis)
- Frontend: `index.html` estático (HTML/CSS/JS vanilla, sin build).
- Backend: Cloudflare Pages Functions en `functions/api/` (`regalos.js` GET, `reservar.js` POST).
- Persistencia: Cloudflare D1 (SQLite), binding `DB`. NO usar KV (no es atómico).

## Lo que ya existe
`index.html`, `functions/api/regalos.js`, `functions/api/reservar.js`, `schema.sql`, `wrangler.toml`, `README.md`.

## Tareas para ti
1. Revisa todo el código y corrígelo si hay errores.
2. Pruébalo en local: crea la D1 local, aplica `schema.sql` y ejecuta `npx wrangler pages dev . --d1=DB=bebe-regalos`. Verifica con curl: listar, reservar, y reservar el mismo regalo dos veces (debe dar 409).
3. Guíame paso a paso para: crear la D1 remota, poner el `database_id` en `wrangler.toml`, aplicar el esquema con `--remote`, conectar el repo de GitHub a Pages y configurar el binding `DB`.
4. Reemplaza los placeholders del `index.html` ([NOMBRE], [FECHA · LUGAR]) cuando te dé los datos.

## Reglas
- Mantén la solución SIMPLE; no agregues versiones complejas, frameworks, autenticación ni panel admin a menos que lo pida.
- Mi stack habitual: R, Python, JavaScript, VBA, SQL. Respóndeme en español, conciso.
- Mejoras opcionales (solo si las pido): código para cancelar reserva, opción "otro regalo", mejor diseño, notificación por correo.
