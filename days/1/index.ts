import { join } from "path";
import { countPasses } from "./countPasses.js";
import { rotate } from "./rotate.js";

import { readFileSync } from "fs";

const steps = readFileSync(join(import.meta.dirname, "input.txt"))
  .toString()
  .split("\n");

let zeroStops = 0;
let totalZeroes = 0;
let pos = 50;
for (const step of steps) {
  const direction = step.charAt(0) as "L" | "R";
  const magnitude = Number(step.substring(1));
  const sign = {
    L: (v: number) => -v,
    R: (v: number) => v,
  }[direction];

  totalZeroes += countPasses(pos, sign(magnitude));
  pos = rotate(pos, sign(magnitude));

  if (pos === 0) {
    zeroStops += 1;
  }
}

console.log({ zeroStops, totalZeroes });
