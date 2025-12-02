/**
 * @param a
 * @param b A positive base
 * @returns a % b, but always in [0, b) (no negative results)
 */
export function absMod(a: number, b: number) {
  const res = a % b;
  if (res < 0) {
    return res + b;
  }
  return res;
}
