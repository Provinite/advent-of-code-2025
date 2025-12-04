/**
 * Check if a given id is invalid, and get its repeated sequence if so
 * @param value
 * @returns
 */
export function parseInvalidIdPart2(value: number):
  | {
      isInvalid: true;
      sequence: number;
    }
  | {
      isInvalid: false;
    } {
  const strVal = String(value);
  const p = /^(.+?)\1+$/;

  const res = p.exec(strVal);
  if (res && res.groups) {
    return {
      isInvalid: true,
      sequence: Number(res.groups.seq),
    };
  }

  return {
    isInvalid: false,
  };
}
