import { getSeason, validHandle } from "@/lib/github";

export async function GET(_req: Request, ctx: { params: Promise<{ user: string }> }) {
  const { user } = await ctx.params;
  if (!validHandle(user)) return Response.json({ error: "invalid" }, { status: 400 });
  const season = await getSeason(user);
  if (!season) return Response.json({ error: "not_found" }, { status: 404 });
  return Response.json(season, { headers: { "cache-control": "public, s-maxage=21600, stale-while-revalidate=86400" } });
}
