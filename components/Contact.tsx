"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/content";
import { setLang, useCopy, useLang } from "@/lib/i18n";
import { say, unlock } from "@/lib/game";
import { BuildZone } from "./BuildZone";
import { Objective } from "./Objective";
import styles from "./Contact.module.css";

type Line = { kind: "in" | "out" | "ok" | "err"; text: string; href?: string };
type Mode = "cmd" | "message" | "email" | "confirm";

const COMMANDS = ["help", "note", "send", "cancel", "socials", "email", "whoami", "stack", "lang", "clear"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const t = useCopy();
  const lang = useLang();
  const pt = lang === "pt";
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<Mode>("cmd");
  const [note, setNote] = useState({ message: "", email: "" });
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const input = useRef<HTMLInputElement>(null);
  const screen = useRef<HTMLDivElement>(null);

  useEffect(() => {
    screen.current?.scrollTo({ top: screen.current.scrollHeight });
  }, [lines]);

  const out = (...l: Line[]) => setLines((prev) => [...prev, ...l].slice(-60));
  const o = (en: string, ptText: string, kind: Line["kind"] = "out"): Line => ({ kind, text: pt ? ptText : en });

  const deliver = async (n: typeof note) => {
    out(o("sending…", "enviando…"));
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(n) });
      if (r.ok) {
        out(o("delivered. he replies by email.", "entregue. ele responde por email.", "ok"));
        unlock("pen-pal");
        say(pt ? "Recado entregue. Eu mesmo levei." : "Note delivered. I carried it myself.");
        setNote({ message: "", email: "" });
        return;
      }
      throw new Error(String(r.status));
    } catch {
      out(o("couldn't deliver from here. opening your email app…", "não deu pra entregar daqui. abrindo seu app de email…", "err"));
      const subject = encodeURIComponent(pt ? "Recado do portfólio" : "Note from the portfolio");
      const body = encodeURIComponent(`${n.message}\n\n— ${n.email}`);
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
      unlock("pen-pal");
    }
  };

  const run = (raw: string) => {
    const text = raw.trim();
    const ps1 = mode === "cmd" ? "guest ~ $" : mode === "message" ? (pt ? "recado >" : "note >") : mode === "email" ? "email >" : "[Y/n] >";
    out({ kind: "in", text: `${ps1} ${text}` });

    if (mode === "message") {
      if (text.toLowerCase() === "cancel") return cancel();
      if (!text) return out(o("write something first.", "escreva alguma coisa primeiro.", "err"));
      setNote((n) => ({ ...n, message: text }));
      setMode("email");
      return out(o("your email, so he can reply:", "seu email, pra ele responder:"));
    }
    if (mode === "email") {
      if (text.toLowerCase() === "cancel") return cancel();
      if (!EMAIL.test(text)) return out(o("that doesn't look like an email. try again.", "isso não parece um email. tenta de novo.", "err"));
      setNote((n) => ({ ...n, email: text }));
      setMode("confirm");
      return out(o("send it? [Y/n] (enter = yes)", "enviar? [Y/n] (enter = sim)"));
    }
    if (mode === "confirm") {
      setMode("cmd");
      if (/^n/i.test(text)) return out(o("not sent. your note is kept: type send when ready.", "não enviado. seu recado ficou guardado: digite send quando quiser."));
      return void deliver(note);
    }

    if (!text) return;
    history.current = [text, ...history.current].slice(0, 30);
    cursor.current = -1;
    const [cmd, ...args] = text.split(/\s+/);
    const c = cmd.toLowerCase();

    if (/^rm$/.test(c) && args.some((a) => a.includes("r") && a.startsWith("-"))) {
      document.body.animate([{ transform: "translate(0,0)" }, { transform: "translate(-6px,3px)" }, { transform: "translate(6px,-3px)" }, { transform: "translate(0,0)" }], { duration: 120, iterations: 5 });
      unlock("demolition");
      return out(o("nice try. the lane is protected by a tower.", "boa tentativa. a lane é protegida por uma torre.", "err"));
    }

    switch (c) {
      case "help":
      case "ajuda":
        return out(
          o("commands:", "comandos:"),
          o("  note     write him a note", "  note     escrever um recado"),
          o("  socials  where to find him", "  socials  onde encontrar ele"),
          o("  email    his email address", "  email    o email dele"),
          o("  whoami   who are you?", "  whoami   quem é você?"),
          o("  stack    what he builds with", "  stack    com o que ele constrói"),
          o("  lang     en / pt", "  lang     en / pt"),
          o("  clear    clean the chat", "  clear    limpar o chat"),
        );
      case "note":
      case "recado":
        setMode("message");
        return out(o("type your message and press enter (cancel to stop):", "digite seu recado e aperte enter (cancel para parar):"));
      case "send":
        if (!note.message || !note.email) return out(o("nothing to send yet. type note to write one.", "nada pra enviar ainda. digite note pra escrever."));
        return void deliver(note);
      case "cancel":
        return cancel();
      case "socials":
      case "redes":
        return out(...PROFILE.socials.map((s) => ({ kind: "ok" as const, text: `${s.name.padEnd(10)} ${s.handle}`, href: s.url })));
      case "email":
        navigator.clipboard?.writeText(PROFILE.email).catch(() => {});
        return out({ kind: "ok", text: PROFILE.email, href: `mailto:${PROFILE.email}` }, o("(copied)", "(copiado)"));
      case "whoami":
        return out(o("guest. probably a recruiter. or a dev looking for ideas. both welcome.", "visitante. provavelmente recrutador. ou um dev atrás de ideias. os dois são bem-vindos."));
      case "stack":
        return out(o("react · next.js · angular · react native · typescript · nestjs · node · aws", "react · next.js · angular · react native · typescript · nestjs · node · aws"));
      case "lang": {
        const next = args[0] === "pt" || args[0] === "en" ? args[0] : pt ? "en" : "pt";
        setLang(next);
        return out({ kind: "ok", text: next === "pt" ? "idioma: português" : "language: english" });
      }
      case "clear":
        return setLines([]);
      case "gg":
      case "ggwp":
        unlock("gg");
        return out(o("gg wp. you're a good sport.", "gg wp. espírito esportivo.", "ok"));
      case "ping":
        return out(o("pong. 12ms. server: Brazil, obviously.", "pong. 12ms. servidor: Brasil, claro."));
      case "whey":
      case "protein":
        unlock("protein");
        say(pt ? "30g de proteína. Agora eu carrego dois blocos." : "30g of protein. Now I carry two blocks.");
        return out(o("+30g protein. the minions are bulking.", "+30g de proteína. os minions estão no bulking.", "ok"));
      case "lanecrasher":
        unlock("source");
        return out(o("you read the source. respect.", "você leu o código-fonte. respeito.", "ok"));
      case "sudo":
      case "hire":
        return out(o("permission denied. try hire() in the console.", "permissão negada. tente hire() no console.", "err"));
      case "exit":
        return out(o("there is no exit. only the lane.", "não existe saída. só a lane."));
      default:
        return out(o(`command not found: ${cmd}. type help.`, `comando não encontrado: ${cmd}. digite help.`, "err"));
    }
  };

  const cancel = () => {
    setMode("cmd");
    out(o("cancelled.", "cancelado."));
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp" && mode === "cmd") {
      e.preventDefault();
      cursor.current = Math.min(history.current.length - 1, cursor.current + 1);
      setValue(history.current[cursor.current] ?? "");
    } else if (e.key === "ArrowDown" && mode === "cmd") {
      e.preventDefault();
      cursor.current = Math.max(-1, cursor.current - 1);
      setValue(history.current[cursor.current] ?? "");
    } else if (e.key === "Tab" && mode === "cmd" && value) {
      const hit = COMMANDS.find((c) => c.startsWith(value.toLowerCase()));
      if (hit) {
        e.preventDefault();
        setValue(hit);
      }
    } else if (e.key === "Escape" && mode !== "cmd") {
      cancel();
    }
  };

  const chip = (cmd: string) => {
    run(cmd);
    input.current?.focus({ preventScroll: true });
  };

  const ps1 = mode === "cmd" ? "~ $" : mode === "message" ? (pt ? "recado >" : "note >") : mode === "email" ? "email >" : "[Y/n] >";

  return (
    <section id="contact" className={`container ${styles.section}`} aria-labelledby="contact-title">
      <BuildZone objective="contact">
        <Objective id="contact" n={5} title={t.contact.title} />
      </BuildZone>
      <BuildZone className={styles.cols} duration={2}>
        <ul className={styles.links}>
          {PROFILE.socials.map((s) => (
            <li key={s.name}>
              <a className={styles.social} href={s.url} target="_blank" rel="noopener noreferrer" data-build>
                <span className={styles.socialName}>{s.name}</span>
                <span className={styles.handle}>{s.handle}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
          <li>
            <a className={styles.social} href={`mailto:${PROFILE.email}`} data-build>
              <span className={styles.socialName}>Email</span>
              <span className={styles.handle}>{PROFILE.email}</span>
            </a>
          </li>
        </ul>

        <div className={styles.terminal} data-build="box" data-spot data-say={pt ? "Digite gg. Eu desafio.|Tem comando que não aparece no help.|Ele lê tudo. Até os bugs." : "Type gg. I dare you.|Some commands aren't in help.|He reads everything. Even the bugs."}>
          <div className={styles.bar}>
            <span className={styles.dots} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className={styles.title}>guest@lane · all chat</span>
          </div>
          <div className={styles.screen} ref={screen} onClick={() => input.current?.focus({ preventScroll: true })}>
            <div role="log" aria-label="Terminal output" aria-live="polite">
              {t.contact.boot.map((b) => (
                <p key={b} className={styles.boot}>
                  {b}
                </p>
              ))}
              {lines.map((l, i) => (
                <p key={i} className={styles[l.kind]}>
                  {l.href ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.text}
                    </a>
                  ) : (
                    l.text
                  )}
                </p>
              ))}
            </div>
            <label className={styles.prompt}>
              <span className={styles.ps1}>
                <span className={styles.user}>guest</span> {ps1}
              </span>
              <span className="sr-only">Terminal command</span>
              <input
                ref={input}
                className={styles.input}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKey}
                placeholder={t.contact.placeholder}
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                enterKeyHint="send"
                data-1p-ignore
                data-lpignore="true"
              />
            </label>
          </div>
          <div className={styles.chips}>
            {(["note", "socials", "help"] as const).map((cmd, i) => (
              <button key={cmd} type="button" className={styles.chip} onClick={() => chip(cmd)}>
                {t.contact.chips[i]}
              </button>
            ))}
          </div>
        </div>
      </BuildZone>
    </section>
  );
}
