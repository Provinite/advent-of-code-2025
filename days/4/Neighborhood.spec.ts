import { Neighborhood } from "./Neighborhood.js";

describe("Neighborhood", () => {
  describe("iterator", () => {
    it("yields in the expected order", () => {
      const expectedOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      for (const [position] of new Neighborhood()) {
        expect(position).toEqual(expectedOrder.shift());
      }
    });
    it("yields the correct values", () => {
      const neighborhood = new Neighborhood();
      neighborhood.value = 0b101010101;

      const expectedOrder = [
        true,
        false,
        true,
        false,
        true,
        false,
        true,
        false,
        true,
      ];

      for (const [, value] of neighborhood) {
        expect(value).toEqual(expectedOrder.shift());
      }
    });
  });
  describe("shiftLeft", () => {
    it.each([
      [0b111111111, 0b111111000],
      [0b101010101, 0b010101000],
    ])("%p => %p", (value, expected) => {
      const neighborhood = new Neighborhood();
      neighborhood.value = value;
      neighborhood.shiftLeft();
      expect(neighborhood.value).toEqual(expected);
    });
  });
  describe("setRightCol", () => {
    it.each([[0b111111000, 0b111111111, true, true, true]])(
      "(%p,%p,%p):%p => %p",
      (value, expected, ...inputs) => {
        const neighborhood = new Neighborhood();
        neighborhood.value = value;
        neighborhood.setRightCol(...inputs);
        expect(neighborhood.value).toEqual(expected);
      }
    );
  });
});
