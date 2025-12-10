import { readFileSync } from "fs";
import { memoize } from "../4/memoize.js";
import { join } from "path";
import { SegmentedSet } from "./SegmentedSet.js";

type Point = [number, number, number];
class Edge {
  points: [Point, Point];
  distance: number;
  constructor(...points: [Point, Point]) {
    this.points = points;
    this.distance = calculateDistanceSq(...points);
  }
}

const calculateDistanceSq = memoize((a: Point, b: Point) =>
  a.reduce((acc, _, i) => Math.pow(a[i]! - b[i]!, 2) + acc, 0)
);

const raw = readFileSync(join(import.meta.dirname, "input.txt")).toString();
const input = raw.split("\n").map((s) => s.split(",").map(Number)) as Point[];

function part1() {
  const candidateEdges: Edge[] = [];
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      candidateEdges.push(new Edge(input[i]!, input[j]!));
    }
  }
  candidateEdges.sort((a, b) => b.distance - a.distance);
  const segmentedSet = new SegmentedSet(input);
  for (let i = 0; i < 999; ++i) {
    const candidate = candidateEdges.pop();
    if (!candidate) {
      break;
    }
    if (segmentedSet.friends(...candidate.points)) {
      continue;
    }

    segmentedSet.makeFriends(...candidate.points);
  }

  const sets = [...segmentedSet.sets].map((s) => s.size).sort((a, b) => b - a);

  return sets[0]! + sets[1]! + sets[2]!;
}

function part2() {
  const candidateEdges: Edge[] = [];
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      candidateEdges.push(new Edge(input[i]!, input[j]!));
    }
  }
  candidateEdges.sort((a, b) => b.distance - a.distance);
  const segmentedSet = new SegmentedSet(input);
  let lastUsedEdge: Edge | null = null;
  while (segmentedSet.sets.size > 1) {
    const candidate = candidateEdges.pop();
    if (!candidate) {
      break;
    }
    if (segmentedSet.friends(...candidate.points)) {
      continue;
    }

    segmentedSet.makeFriends(...candidate.points);
    lastUsedEdge = candidate;
  }

  return lastUsedEdge!.points[0][0] * lastUsedEdge!.points[1][0];
}

console.log({ part1: part1(), part2: part2() });
