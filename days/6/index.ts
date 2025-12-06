import { readFileSync } from "fs";
import { join } from "path";

enum Operation {
  Add,
  Multiply,
}
const raw = readFileSync(join(import.meta.dirname, "input.txt")).toString();
const table = raw.split("\n").map((line) => line.trim().split(/\s+/));

const readColumn = (i: number) => table.map((row) => row[i]!);
const parseColumn = (column: string[]) => {
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

console.log(table);

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

for (let i = 0; i < table[0]!.length; i++) {
  const { operands, operation } = parseColumn(readColumn(i));
  if (operation === undefined) {
    throw new Error(`Unknown operation: ${operation} @ column ${i}`);
  }
  const result = operands.reduce(...operationReducers[operation]);
  problems.push({ operands, operation, result });
}

console.log(
  `Grand Total: ${problems.reduce(
    (acc: number, problem) => acc + problem.result,
    0
  )}`
);
