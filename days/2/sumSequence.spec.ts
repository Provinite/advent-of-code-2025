import { sumSequence } from "./sumSequence.js";

describe("sumSequence", () => {
  it.each([
    [0, 3, 6],
    [1, 3, 6],
    [2, 3, 5],
    [0, 100, 5050],
    [2, 100, 5049],
  ])("start: %p, end: %p, expected: %p", (start, end, expected) => {
    expect(sumSequence(start, end)).toEqual(expected);
  });
});
