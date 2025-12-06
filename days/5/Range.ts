export class Range {
  constructor(public start: number, public end: number) {
    if (start > end) {
      throw new Error("start > end");
    }
  }
  overlaps(that: Range) {
    return (
      this.includes(that.start) ||
      this.includes(that.end) ||
      that.includes(this.start) ||
      that.includes(this.end)
    );
  }

  includes(n: number) {
    return n >= this.start && n <= this.end;
  }

  static merge(a: Range, b: Range) {
    return new Range(Math.min(a.start, b.start), Math.max(a.end, b.end));
  }

  toString() {
    return `[${this.start}, ${this.end}]`;
  }

  size() {
    return this.end - this.start + 1;
  }
}
