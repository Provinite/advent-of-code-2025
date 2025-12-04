import { getNextInvalidId } from "./getNextInvalidId.js";
import { getPreviousInvalidId } from "./getPreviousInvalidId.js";
import { sumSequence } from "./sumSequence.js";

export function sumInvalidIds(start: number, end: number) {
  const first = getNextInvalidId(start);
  const last = getPreviousInvalidId(end);

  console.log({ start, end, first, last });
  if (first > last) {
    return 0;
  }
  if (first === last) {
    return 1;
  }
  if (String(first).length === String(last).length) {
    const k = String(first).length / 2;

    // wrong sums here
    // for the case 11 22 33 44 55 66...
    // we want to sum 1 2 3 4 5 6, not 11 12 13 14 15 16...
    const startIdentifierSum = sumSequence(Math.pow(10, k), first);
    const totalToStart = startIdentifierSum * (Math.pow(10, k) + 1);

    const endIdentifierSum = sumSequence(last, Math.pow(10, k) - 1);
    const totalAfterEnd = endIdentifierSum * (Math.pow(10, k) + 1);

    console.log({ k, startIdentifierSum, endIdentifierSum });

    const totalIdentifierSum = sumSequence(
      Math.pow(10, k),
      Math.pow(10, k + 1) - 1
    );
    const totalInLength = totalIdentifierSum * (Math.pow(10, k) + 1);

    return totalInLength - totalToStart - totalAfterEnd;
  }
}
