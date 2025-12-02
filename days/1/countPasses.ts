export function countPasses(initialPosition: number, spin: number) {
  /**
   * Number of clicks in the current direction required to reach zero.
   */
  const toZero = spin < 0 ? initialPosition : 100 - initialPosition;

  /**
   * The number of clicks left after reaching zero
   */
  const remainder = Math.abs(spin) - toZero;

  // did not make it to zero
  if (remainder < 0) {
    return 0;
  }

  /**
   * The number of full spins made after reaching zero
   */
  const remainderSpins = Math.floor(remainder / 100);
  if (toZero === 0) {
    return remainderSpins;
  }
  return remainderSpins + 1;
}
