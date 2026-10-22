// GET /api/reservas?key=SECRETO -> CSV (regalo, nombres, fecha) para leerlo desde Google Sheets con IMPORTDATA
// Solo responde si env.RESERVAS_KEY está definida y coincide con ?key=
export async function onRequestGet({ request, env }) {
  const key = new URL(request.url).searchParams.get('key');
  if (!env.RESERVAS_KEY || key !== env.RESERVAS_KEY) return new Response('No encontrado', { status: 404 });

  const { results } = await env.DB.prepare(
    `SELECT g.nombre AS regalo, r.nombres, r.creado_en
     FROM reservas r JOIN regalos g ON g.id = r.regalo_id
     ORDER BY r.creado_en`
  ).all();

  const celda = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const filas = [['Regalo', 'Quién(es)', 'Fecha (UTC)'], ...results.map(r => [r.regalo, r.nombres, r.creado_en])];
  return new Response(filas.map(f => f.map(celda).join(',')).join('\n'), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
