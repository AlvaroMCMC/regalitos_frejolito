// GET /api/regalos -> lista de regalos con estado (no expone nombres de quien reservó)
export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    `SELECT g.id, g.nombre, g.url, (r.regalo_id IS NOT NULL) AS reservado
     FROM regalos g LEFT JOIN reservas r ON r.regalo_id = g.id
     ORDER BY g.id`
  ).all();
  return Response.json(results.map(r => ({ ...r, reservado: !!r.reservado })), {
    headers: { 'Cache-Control': 'no-store' },
  });
}
