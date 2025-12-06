import { NeighborhoodPosition } from "./NeighborhoodPosition.js";

/**
 * The neighborhood
 * i f c
 * h e b
 * g d a
 *
 * can be represented as a bitstring
 * ihgfedcba
 * then sliding the window is as easy as bit-shifting and unsetting some bits
 *
 */
export class Neighborhood {
  value: number = 0;
  constructor() {}

  *[Symbol.iterator]() {
    for (let i = 0; i < 9; i++) {
      const mask = 0b1 << i;
      yield [i as NeighborhoodPosition, Boolean(this.value & mask)];
    }
  }

  /**
   * Shift the neighborhood left 1 column, dropping the leftmost column data.
   */
  shiftLeft() {
    this.value = this.value << 3;
    // clear out the overflow and leave the least significant 3 digits as zeros
    this.value = this.value & 0b000111111000;
  }

  /**
   * Set the rightmost column of the neighborhood
   * @param top
   * @param center
   * @param bottom
   */
  setRightCol(top: boolean, center: boolean, bottom: boolean) {
    this.value =
      this.value | (Number(top) << 2) | (Number(center) << 1) | Number(bottom);
  }

  toString() {
    const r = (position: NeighborhoodPosition) =>
      this.value & (1 << position) ? "@" : ".";

    const res = [
      [
        NeighborhoodPosition.NorthWest,
        NeighborhoodPosition.North,
        NeighborhoodPosition.NorthEast,
      ],
      [
        NeighborhoodPosition.West,
        NeighborhoodPosition.Center,
        NeighborhoodPosition.East,
      ],
      [
        NeighborhoodPosition.SouthWest,
        NeighborhoodPosition.South,
        NeighborhoodPosition.SouthEast,
      ],
    ]
      .map((d) => d.map(r).join(" "))
      .join("\n");

    return res;
  }
}
