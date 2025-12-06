import { readFileSync } from "fs";
import { join } from "path";
import { Board } from "./Board.js";
import { BoardWindow } from "./BoardWindow.js";

const lines = readFileSync(join(import.meta.dirname, "input.txt"))
  .toString()
  .split("\n");

const board = new Board();
const inputWidth = lines[0]!.length;
const finalWidth = inputWidth + 2;
// add top and bottom margins
lines.unshift(".".repeat(inputWidth));
lines.push(".".repeat(inputWidth));

for (let i = 0; i < lines.length; ++i) {
  // add left and right margins
  board.set(i, 0, false);
  board.set(i, finalWidth - 1, false);

  const line = lines[i]!;
  for (let j = 0; j < line.length; ++j) {
    board.set(i, j + 1, line[j] === "@");
  }
}

function part1(board: Board) {
  const window = new BoardWindow(board);
  let count = Number(window.isAccessible());

  while (window.hasNext()) {
    window.next();

    if (window.isAccessible()) {
      ++count;
    }
  }
  return count;
}

function part2(board: Board) {
  let count = 0;
  let stable = false;
  let positionsToClear: [row: number, col: number][] = [];
  const window = new BoardWindow(board);

  while (!stable) {
    window.reset();
    positionsToClear = [];
    while (true) {
      if (window.isAccessible()) {
        positionsToClear.push([...window.curCenter]);
        ++count;
      }
      if (window.hasNext()) {
        window.next();
      } else {
        break;
      }
    }

    for (const [row, col] of positionsToClear) {
      board.set(row, col, false);
    }

    stable = positionsToClear.length === 0;
  }
  return count;
}

console.log({ part1: part1(board), part2: part2(board) });
