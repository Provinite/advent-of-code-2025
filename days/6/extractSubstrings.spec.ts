import { extractSubstrings } from "./extractSubstrings.js";

describe("extractSubstrings", () => {
  it.each([
    [
      "aaaxbbbxcccxdddxeeexfff",
      [3, 7, 11, 15, 19],
      ["aaa", "bbb", "ccc", "ddd", "eee", "fff"],
    ],
    ["123 328  51 64 ", [3, 7, 11], ["123", "328", " 51", "64 "]],
  ])("%p split: %p -> %p", (str, boundaries, expected) => {
    expect(extractSubstrings(str, boundaries)).toEqual(expected);
  });
});
