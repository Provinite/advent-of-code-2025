import { readFileSync } from "fs";
import path from "path";
import { getMaxJoltage } from "./getMaxJoltage.js";

const lines = readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .split("\n");

const sum2 = lines
  .map((line) => getMaxJoltage(line, 2))
  .reduce((j, sum) => j + sum, 0);
const sum12 = lines
  .map((line) => getMaxJoltage(line, 12))
  .reduce((j, sum) => j + sum, 0);

console.log({ sum2, sum12 });
