/**
 * @param start inclusive range start
 * @param end inclusive range end
 * @returns The sum of the integers in range [start, end]
 */
export function sumSequence(start: number, end: number) {
  return (end * (end + 1)) / 2 - ((start - 1) * start) / 2;
}
