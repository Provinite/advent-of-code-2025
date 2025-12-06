import { readFileSync } from "fs";
import { Range } from "./Range.js";
import { join } from "path";
const ranges: Range[] = [];
const lines = readFileSync(join(import.meta.dirname, "input.txt"))
  .toString()
  .split("\n");

let line: string;
while ((line = lines.shift()!)) {
  const [start, end] = line.split("-").map(Number);

  if (start === undefined || end === undefined) {
    throw new Error(`Invalid input format: "${line}", expected range.`);
  }
  let newRange = new Range(start, end);

  for (let i = ranges.length - 1; i >= 0; --i) {
    const range = ranges[i]!;
    if (newRange.overlaps(range)) {
      ranges.splice(i, 1);
      newRange = Range.merge(range, newRange);
    }
  }
  ranges.push(newRange);
}

console.log({
  totalCount: ranges.map((r) => r.size()).reduce((a, b) => a + b, 0),
});

let count = 0;
while ((line = lines.shift()!)) {
  const num = Number(line);
  if (isNaN(num)) {
    throw new Error(`Invalid input format: "${line}", expected value`);
  }
  if (ranges.some((r) => r.includes(num))) {
    ++count;
  }
}
console.log({ count });
