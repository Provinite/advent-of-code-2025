import { readFileSync } from "fs";
import { join } from "path";
import { parseInvalidIdPart1 } from "../common/parseInvalidIdPart1.js";
import { parseInvalidIdPart2 } from "../common/partsInvalidIdPart2.js";

const ranges = readFileSync(join(import.meta.dirname, "..", "input.txt"))
  .toString()
  .split(",");

let sumPart1 = 0;
let sumPart2 = 0;
for (const range of ranges) {
  const [start, end] = range.split("-").map(Number) as [number, number];
  for (let i = start; i <= end; i++) {
    const check = parseInvalidIdPart1(i);
    if (check.isInvalid) {
      sumPart1 += i;
    }

    const check2 = parseInvalidIdPart2(i);
    if (check2.isInvalid) {
      sumPart2 += i;
    }
  }
}
console.log({ sumPart1, sumPart2 });
