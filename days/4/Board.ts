export class Board {
  public data: boolean[][] = [];

  width() {
    return this.data[0]?.length ?? 0;
  }

  height() {
    return this.data.length;
  }

  set(rowIdx: number, colIdx: number, val: boolean) {
    const row = this.data[rowIdx] || [];
    row[colIdx] = val;
    this.data[rowIdx] = row;
  }

  get(rowIdx: number, colIdx: number, def = false) {
    return this.data[rowIdx]?.[colIdx] ?? def;
  }
}
