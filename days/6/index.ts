import { readFileSync } from "fs";
import { join } from "path";
import { getColumnDelimiters } from "./getColumnDelimiters.js";
import { extractSubstrings } from "./extractSubstrings.js";

enum Operation {
  Add,
  Multiply,
}
const raw = readFileSync(join(import.meta.dirname, "input.txt")).toString();
const table = raw.split("\n").map((line) => line.trim().split(/\s+/));

const readColumn = (i: number) => table.map((row) => row[i]!);
const parseColumnPart1 = (column: string[]) => {
  const operands: number[] = [];
  const operator = column.at(-1)!;
  for (let i = 0; i < column.length - 1; ++i) {
    operands.push(Number(column[i]));
  }
  return {
    operation: { "*": Operation.Multiply, "+": Operation.Add }[operator],
    operands,
  };
};

const lines = raw.split("\n");
const columnDelimiters = getColumnDelimiters(raw);
const tableWithSpacing = lines.map((line) => {
  const s = extractSubstrings(line, columnDelimiters);
  return s;
});

console.log(tableWithSpacing);

const parseColumnPart2 = (column: number) => {
  const tokens = tableWithSpacing.map((r) => r[column]!);
  const operator = tokens.pop()!.trim();
  let operation: Operation | null = null;

  if (operator === "*") {
    operation = Operation.Multiply;
  } else if (operator === "+") {
    operation = Operation.Add;
  } else {
    throw new Error(`Unknown operator: ${operator}`);
  }
  const operands: number[] = [];
  for (let i = 0; i < tokens[0]!.length; i++) {
    const operandStr = tokens
      .map((t) => t.charAt(i).replace(/\s/, ""))
      .join("");
    operands.push(Number(operandStr));
  }
  return { operands, operation };
};

const problems: {
  operands: number[];
  operation: Operation;
  result: number;
}[] = [];

const operationReducers: Record<
  Operation,
  [reducer: (acc: number, operand: number) => number, init: number]
> = {
  [Operation.Add]: [(a, b) => a + b, 0],
  [Operation.Multiply]: [(a, b) => a * b, 1],
};

function main(
  parser: (col: number) => {
    operation: Operation | undefined | null;
    operands: number[];
  }
) {
  for (let i = 0; i < table[0]!.length; i++) {
    const { operands, operation } = parser(i);
    if (operation === undefined || operation === null) {
      throw new Error(`Unknown operation: ${operation} @ column ${i}`);
    }
    const result = operands.reduce(...operationReducers[operation]);
    problems.push({ operands, operation, result });
  }

  console.log(JSON.stringify({ problems }, null, 2));
  return problems.reduce((acc: number, problem) => acc + problem.result, 0);
}

console.log({
  // part1: main((c) => parseColumnPart1(readColumn(c))),
  part2: main((c) => parseColumnPart2(c)),
});
