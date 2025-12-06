import type { Board } from "./Board.js";
import { isAccessible } from "./isAccessible.js";
import { Neighborhood } from "./Neighborhood.js";

export class BoardWindow {
  curCenter!: [row: number, col: number];
  constructor(private board: Board) {
    this.reset();
  }
  neighborhood: Neighborhood = new Neighborhood();

  reset() {
    this.curCenter = [1, 1];
    this.refresh();
  }

  hasNext() {
    return (
      this.curCenter[1] < this.board.width() - 2 ||
      this.curCenter[0] < this.board.height() - 2
    );
  }

  next() {
    if (this.curCenter[1] < this.board.width() - 2) {
      this.slideRight();
    } else {
      this.carriageReturn();
    }
  }

  private slideRight() {
    const col = this.curCenter[1] + 2;
    const row = this.curCenter[0];
    this.readColumn(
      this.board.get(row - 1, col),
      this.board.get(row, col),
      this.board.get(row + 1, col)
    );
    this.curCenter[1] += 1;
  }

  private carriageReturn() {
    this.curCenter = [this.curCenter[0] + 1, 1];
    this.refresh();
  }

  private refresh() {
    const [row, col] = this.curCenter;
    for (let i = -1; i <= 1; i++) {
      this.readColumn(
        this.board.get(row - 1, col + i),
        this.board.get(row, col + i),
        this.board.get(row + 1, col + i)
      );
    }
  }

  private readColumn(top: boolean, center: boolean, bottom: boolean) {
    this.neighborhood.shiftLeft();
    this.neighborhood.setRightCol(top, center, bottom);
  }

  private _isAccessible = isAccessible();

  public isAccessible() {
    return this._isAccessible(this.neighborhood);
  }
}
