import { parseInvalidIdPart1 } from "../common/parseInvalidIdPart1.js";
import { appendNumbersAsStrings } from "./appendNumbersAsStrings.js";

/**
 * Get the next invalid id in range [start, +inf)
 * @param start
 */
export function getNextInvalidId(start: number) {
  const check = parseInvalidIdPart1(start);
  if (check.isInvalid) {
    return start;
  }
  if (check.hasEvenLength) {
    const [left] = check.parts;
    if (start < appendNumbersAsStrings(left, left)) {
      return appendNumbersAsStrings(left, left);
    }
    return appendNumbersAsStrings(left + 1, left + 1);
  } else {
    const sequence = Math.pow(10, Math.ceil(String(start).length / 2) - 1);
    return appendNumbersAsStrings(sequence, sequence);
  }
}
