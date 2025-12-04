import { getPreviousInvalidId } from "./getPreviousInvalidId.js";

describe("getPreviousInvalidId", () => {
  it.each([
    [22, 22],
    [21, 11],
    [124125, 124124],
    [1009, 99],
    [100101, 100100],
    [100099, 9999],
  ])("%p -> %p", (input, expected) => {
    expect(getPreviousInvalidId(input)).toEqual(expected);
  });
});
