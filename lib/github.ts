// Server-only: a user's last-year contribution calendar.

export type Day = { date: string; count: number; level: number };
export type Season = { user: string; total: number; days: Day[] };

const HANDLE = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export function validHandle(user: string) {
  return HANDLE.test(user);
}

function attr(tag: string, name: string) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
}

async function fromGitHub(user: string): Promise<Season | null> {
  const res = await fetch(`https://github.com/users/${user}/contributions`, {
    headers: { "user-agent": "Mozilla/5.0 (portfolio contributions)", accept: "text/html" },
    next: { revalidate: 21600 },
  });
  if (!res.ok) return null;
  const html = await res.text();
  const counts = new Map<string, number>();
  for (const m of html.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const n = m[2].match(/^([\d,]+)\s+contribution/);
    counts.set(m[1], n ? Number(n[1].replace(/,/g, "")) : 0);
  }
  const days: Day[] = [];
  for (const m of html.matchAll(/<td\b[^>]*ContributionCalendar-day[^>]*>/g)) {
    const date = attr(m[0], "data-date");
    if (!date) continue;
    const id = attr(m[0], "id") ?? "";
    days.push({ date, level: Number(attr(m[0], "data-level") ?? 0), count: counts.get(id) ?? 0 });
  }
  if (!days.length) return null;
  days.sort((a, b) => a.date.localeCompare(b.date));
  const total = Number(html.match(/([\d,]+)\s+contributions?\s+in the last year/)?.[1].replace(/,/g, "") ?? days.reduce((n, d) => n + d.count, 0));
  return { user, total, days };
}

async function fromMirror(user: string): Promise<Season | null> {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, { next: { revalidate: 21600 } });
  if (!res.ok) return null;
  const data = (await res.json()) as { total?: { lastYear?: number }; contributions?: Day[] };
  if (!data.contributions?.length) return null;
  return { user, total: data.total?.lastYear ?? 0, days: data.contributions };
}

function mock(user: string): Season {
  const days: Day[] = [];
  const end = new Date();
  let seed = [...user].reduce((n, c) => n + c.charCodeAt(0), 7);
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  for (let i = 364; i >= 0; i--) {
    const d = new Date(end.getTime() - i * 864e5);
    const r = rnd();
    const count = r < 0.35 ? 0 : Math.floor(r * r * 14);
    days.push({ date: d.toISOString().slice(0, 10), count, level: count === 0 ? 0 : Math.min(4, Math.ceil(count / 3)) });
  }
  return { user, total: days.reduce((n, d) => n + d.count, 0), days };
}

export async function getSeason(user: string): Promise<Season | null> {
  if (!validHandle(user)) return null;
  if (process.env.CONTRIB_MOCK === "1") return mock(user);
  try {
    return (await fromGitHub(user)) ?? (await fromMirror(user));
  } catch {
    try {
      return await fromMirror(user);
    } catch {
      return null;
    }
  }
}
