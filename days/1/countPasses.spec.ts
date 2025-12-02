import { countPasses } from "./countPasses.js";

describe("countPasses", () => {
  describe("left", () => {
    it.each([
      [50, 50, 1],
      [50, 49, 0],
      [50, 51, 1],
      [50, 150, 2],
      [50, 149, 1],
      [50, 341, 3],
      [99, 2, 0],
      [0, 10, 0],
      [0, 100, 1],
    ])("start: %p, left: %p, zeroes: %p", (start, left, expected) => {
      expect(countPasses(start, -left)).toEqual(expected);
    });
  });
  describe("right", () => {
    it.each([
      [50, 50, 1],
      [50, 49, 0],
      [50, 51, 1],
      [50, 150, 2],
      [50, 149, 1],
      [50, 341, 3],
      [99, 2, 1],
      [0, 100, 1],
      [0, 50, 0],
    ])("start: %p, right: %p, zeroes: %p", (start, right, expected) => {
      expect(countPasses(start, right)).toEqual(expected);
    });
  });
});
