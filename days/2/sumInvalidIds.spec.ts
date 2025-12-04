import { sumInvalidIds } from "./sumInvalidIds.js";

describe("sumInvalidIds", () => {
  it.each([
    [10, 20, 1],
    [10, 80, 308],
  ])("start: %p, end: %p, expected: %p", (start, end, expected) => {
    expect(sumInvalidIds(start, end)).toEqual(expected);
  });
});
