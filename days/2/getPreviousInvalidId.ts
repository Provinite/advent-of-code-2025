import { appendNumbersAsStrings } from "./appendNumbersAsStrings.js";
import { parseInvalidId } from "./parseInvalidId.js";

export function getPreviousInvalidId(start: number) {
  const check = parseInvalidId(start);
  if (start < 11) {
    throw new Error("No invalid IDs exist below 11");
  }
  if (check.isInvalid) {
    return start;
  }
  if (check.hasEvenLength) {
    const [left] = check.parts;
    if (start > appendNumbersAsStrings(left, left)) {
      return appendNumbersAsStrings(left, left);
    }
    return appendNumbersAsStrings(left - 1, left - 1);
  } else {
    const sequence = Math.ceil(String(start).length / 2) - 1;
    return appendNumbersAsStrings(sequence, sequence);
  }
}
