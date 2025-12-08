import { readFileSync } from "fs";
import { join } from "path";
import { inputToNode } from "./inputToNode.js";
import { printGraph } from "./printGraph.js";
import { calculatePaths } from "./calculatePaths.js";

const raw = readFileSync(join(import.meta.dirname, "input.txt")).toString();
const lines = raw.split("\n");

const startColumn = lines.shift()!.indexOf("S");
const width = lines[0]!.length;

function part1() {
  let splitCount = 0;
  let beams = new Set<number>();
  beams.add(startColumn);
  for (let row = 0; row < lines.length; ++row) {
    const toRemove = new Set<number>();
    const toAdd = new Set<number>();

    for (const beam of beams) {
      if (lines[row]![beam] === "^") {
        ++splitCount;
        toRemove.add(beam);
        if (beam > 0) {
          toAdd.add(beam - 1);
        }
        if (beam < width - 1) {
          toAdd.add(beam + 1);
        }
      }
    }
    beams = beams.difference(toRemove);
    beams = beams.union(toAdd);
  }
  return splitCount;
}

function part2() {
  const { head, tail } = inputToNode(raw);
  calculatePaths(tail);
  return head.pathsToBase;
}

console.log({ part1: part1(), part2: part2() });
