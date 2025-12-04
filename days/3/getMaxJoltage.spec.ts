import { getMaxJoltage } from "./getMaxJoltage.js";

describe("getMaxJoltage", () => {
  it.each([
    ["12345", 2, 45],
    ["54321", 2, 54],
    ["111811191111", 2, 91],
    ["12345", 3, 345],
    ["54321", 3, 543],
    ["11181119111511117", 3, 957],
  ])("inputs: %p, switches: %p -> %p", (inputs, switches, expected) => {
    expect(getMaxJoltage(inputs, switches)).toEqual(expected);
  });
});
