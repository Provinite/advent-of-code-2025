/**
 * Slice a string by separator character indices. Removes separator characters.
 * @param str
 * @param separatorIndices
 * @returns
 */
export function extractSubstrings(str: string, separatorIndices: number[]) {
  const substrings: string[] = [];
  separatorIndices = [...separatorIndices];
  let last = -1;
  while (separatorIndices.length) {
    const next = separatorIndices.shift()!;
    substrings.push(str.substring(last + 1, next));
    last = next;
  }
  substrings.push(str.substring(last + 1));
  return substrings;
}
