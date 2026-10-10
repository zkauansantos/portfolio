// Tiny global game state: secrets found (persisted), objectives captured this visit, souls.

import { useSyncExternalStore } from "react";

export type SecretId =
  | "impatient" | "konami" | "night-owl" | "demolition" | "gg" | "pen-pal" | "last-hit"
  | "farmer" | "feeder" | "afk" | "recruiter" | "source" | "polyglot" | "double-under"
  | "knockout" | "protein" | "rival" | "base" | "speedrun" | "ping";

type L = { en: string; pt: string };
export const SECRETS: { id: SecretId; name: L; hint: L; found: L }[] = [
  { id: "impatient", name: { en: "Impatient", pt: "Apressado" }, hint: { en: "Some people skip the wave.", pt: "Tem gente que pula a wave." }, found: { en: "You skipped the intro.", pt: "Você pulou a intro." } },
  { id: "knockout", name: { en: "Knockout", pt: "Nocaute" }, hint: { en: "The name can take a few hits.", pt: "O nome aguenta uns golpes." }, found: { en: "You knocked the name down.", pt: "Você derrubou o nome." } },
  { id: "last-hit", name: { en: "Last hit", pt: "Last hit" }, hint: { en: "The little one wants to farm with you.", pt: "O pequeno quer farmar com você." }, found: { en: "You took a last hit.", pt: "Você pegou um last hit." } },
  { id: "farmer", name: { en: "Farmer", pt: "Farmador" }, hint: { en: "Five in a row. No misses.", pt: "Cinco seguidos. Sem errar." }, found: { en: "Five last hits in a row.", pt: "Cinco last hits seguidos." } },
  { id: "feeder", name: { en: "Feeder", pt: "Feeder" }, hint: { en: "Let the creeps have it. Thrice.", pt: "Deixa os creeps pegarem. Três vezes." }, found: { en: "You missed three in a row. On purpose?", pt: "Você errou três seguidos. De propósito?" } },
  { id: "afk", name: { en: "AFK", pt: "AFK" }, hint: { en: "Go quiet for a while.", pt: "Fique quieto um tempo." }, found: { en: "You went AFK and the minion noticed.", pt: "Você ficou AFK e o minion percebeu." } },
  { id: "pen-pal", name: { en: "All chat", pt: "Chat geral" }, hint: { en: "Words travel down the lane.", pt: "Palavras descem a lane." }, found: { en: "You sent Kauan a note.", pt: "Você mandou um recado pro Kauan." } },
  { id: "gg", name: { en: "Good game", pt: "Boa partida" }, hint: { en: "Be a good sport in chat.", pt: "Tenha espírito esportivo no chat." }, found: { en: "You typed gg.", pt: "Você digitou gg." } },
  { id: "demolition", name: { en: "Demolition", pt: "Demolição" }, hint: { en: "Some commands should never be run.", pt: "Alguns comandos nunca deveriam ser rodados." }, found: { en: "You ran rm -rf in all chat.", pt: "Você rodou rm -rf no chat." } },
  { id: "protein", name: { en: "Bulking", pt: "Bulking" }, hint: { en: "The crew needs protein.", pt: "A equipe precisa de proteína." }, found: { en: "You fed the minions whey.", pt: "Você deu whey pros minions." } },
  { id: "ping", name: { en: "Ping", pt: "Ping" }, hint: { en: "Alt + click. Every MOBA player knows.", pt: "Alt + clique. Todo jogador de MOBA sabe." }, found: { en: "You pinged the map.", pt: "Você pingou o mapa." } },
  { id: "double-under", name: { en: "Double under", pt: "Double under" }, hint: { en: "The hero skips rope. Poke him.", pt: "O herói pula corda. Cutuque ele." }, found: { en: "You made the hero skip rope.", pt: "Você fez o herói pular corda." } },
  { id: "rival", name: { en: "Rival", pt: "Rival" }, hint: { en: "Put your season next to mine.", pt: "Coloque sua temporada do lado da minha." }, found: { en: "You compared seasons.", pt: "Você comparou temporadas." } },
  { id: "konami", name: { en: "Old school", pt: "Raiz" }, hint: { en: "Thirty lives.", pt: "Trinta vidas." }, found: { en: "You entered the Konami code.", pt: "Você digitou o código Konami." } },
  { id: "recruiter", name: { en: "Recruiter", pt: "Recrutador" }, hint: { en: "There is a door behind the page.", pt: "Tem uma porta atrás da página." }, found: { en: "You hired Kauan from the console.", pt: "Você contratou o Kauan pelo console." } },
  { id: "source", name: { en: "Source", pt: "Código-fonte" }, hint: { en: "Read what is not shown.", pt: "Leia o que não aparece." }, found: { en: "You found the word in the source.", pt: "Você achou a palavra no código-fonte." } },
  { id: "polyglot", name: { en: "Polyglot", pt: "Poliglota" }, hint: { en: "Fala português?", pt: "Do you speak English?" }, found: { en: "You switched languages.", pt: "Você trocou de idioma." } },
  { id: "night-owl", name: { en: "Night owl", pt: "Coruja" }, hint: { en: "Ranked after midnight.", pt: "Ranqueada depois da meia-noite." }, found: { en: "You visited between midnight and 5am.", pt: "Você visitou entre meia-noite e 5h." } },
  { id: "base", name: { en: "Base reached", pt: "Base alcançada" }, hint: { en: "Push all the way.", pt: "Empurre até o fim." }, found: { en: "You pushed the whole lane.", pt: "Você empurrou a lane inteira." } },
  { id: "speedrun", name: { en: "Rush B", pt: "Rush B" }, hint: { en: "Reach the base fast. Really fast.", pt: "Chegue na base rápido. Muito rápido." }, found: { en: "You reached the base in under 15 seconds.", pt: "Você chegou na base em menos de 15 segundos." } },
];

const KEY = "lane:secrets";
const listeners = new Set<() => void>();
let found: SecretId[] | null = null;
let captured: string[] = [];
let toastQueue: SecretId[] = [];

function load(): SecretId[] {
  if (found) return found;
  try {
    found = JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    found = [];
  }
  return found!;
}

const emit = () => listeners.forEach((l) => l());

export function unlock(id: SecretId) {
  const list = load();
  if (list.includes(id)) return;
  found = [...list, id];
  try {
    localStorage.setItem(KEY, JSON.stringify(found));
  } catch {}
  toastQueue = [...toastQueue, id];
  emit();
}

export function capture(section: string) {
  if (captured.includes(section)) return;
  captured = [...captured, section];
  emit();
}

export function shiftToast() {
  toastQueue = toastQueue.slice(1);
  emit();
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

const EMPTY: SecretId[] = [];
const NONE: string[] = [];

export function useSecrets() {
  return useSyncExternalStore(subscribe, load, () => EMPTY);
}
export function useCaptured() {
  return useSyncExternalStore(subscribe, () => captured, () => NONE);
}
export function useToast() {
  return useSyncExternalStore(subscribe, () => toastQueue[0] ?? null, () => null);
}

/** 100 souls per objective captured, 250 per secret. */
export function useSouls() {
  const s = useSecrets();
  const c = useCaptured();
  return c.length * 100 + s.length * 250;
}

/** The companion speaks whatever is dispatched here. */
export function say(line: string, ms = 3000) {
  dispatchEvent(new CustomEvent("minion-say", { detail: { line, ms } }));
}
