// Hand-off between the hero crew and the companion: the leader minion that finishes the
// intro becomes the companion that follows you down the lane.

type Point = { x: number; y: number };

export const bridge: { spawn: Point | null; introDoneAt: number } = { spawn: null, introDoneAt: 0 };

export function spawnCompanion(p: Point) {
  bridge.spawn = p;
  bridge.introDoneAt = performance.now();
  dispatchEvent(new CustomEvent("companion-spawn", { detail: p }));
}
