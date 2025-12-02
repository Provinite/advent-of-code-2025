import { absMod } from "./absMod.js";

/**
 * Determine the new dial position after spinning a combination
 * dial.
 * @param initialPosition Initial dial position. Must be in [0, 100)
 * @param spin
 * @returns The new dial position; in [0, 100)
 */
export function rotate(initialPosition: number, spin: number) {
  const newValue = spin + initialPosition;
  return absMod(newValue, 100);
}
