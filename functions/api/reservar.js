// POST /api/reservar  body: { regalo_id: number, nombres: string[] }
export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return err('JSON inválido', 400); }

  if (!body || typeof body !== 'object') return err('JSON inválido', 400);

  const regaloId = Number(body.regalo_id);
  const nombres = (Array.isArray(body.nombres) ? body.nombres : [])
    .map(n => String(n).trim().slice(0, 80))
    .filter(Boolean)
    .slice(0, 10);

  if (!Number.isInteger(regaloId) || nombres.length === 0) {
    return err('Datos incompletos', 400);
  }

  const existe = await env.DB.prepare('SELECT id FROM regalos WHERE id = ?').bind(regaloId).first();
  if (!existe) return err('Regalo no existe', 404);

  try {
    await env.DB.prepare('INSERT INTO reservas (regalo_id, nombres) VALUES (?, ?)')
      .bind(regaloId, nombres.join(', ')).run();
  } catch (e) {
    if (String(e.message).includes('UNIQUE') || String(e.message).includes('PRIMARY')) {
      return err('Ese regalo ya fue elegido por otra persona', 409);
    }
    return err('Error interno', 500);
  }
  return Response.json({ ok: true });
}

const err = (msg, status) => Response.json({ ok: false, error: msg }, { status });
