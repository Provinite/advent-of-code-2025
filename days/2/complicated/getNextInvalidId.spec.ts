import { getNextInvalidId } from "./getNextInvalidId.js";

describe("getNextInvalidId", () => {
  it.each([
    [1, 11],
    [124000, 124124],
    [12400, 100100],
    [0, 11],
    [124124, 124124],
    [124125, 125125],
    [9999, 9999],
    [999, 1010],
  ])("%p -> %p", (input, expected) => {
    expect(getNextInvalidId(input)).toEqual(expected);
  });
});
