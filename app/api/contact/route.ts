// Sends a note from the all-chat terminal by email through Resend.
// Needs RESEND_API_KEY and CONTACT_TO; without them it answers 503 and the client opens mailto instead.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) return Response.json({ error: "not_configured" }, { status: 503 });

  let body: { message?: unknown; email?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!message || message.length > 4000 || !EMAIL.test(email) || email.length > 200) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "The Lane <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `New note in all chat from ${email}`,
      text: `${message}\n\n— ${email}`,
    }),
  });
  if (!res.ok) return Response.json({ error: "send_failed" }, { status: 502 });
  return Response.json({ ok: true });
}
