/**
 * Check if a given id is invalid, and get its repeated sequence if so
 * @param value
 * @returns
 */
export function parseInvalidId(value: number):
  | {
      hasEvenLength: false;
      isInvalid: false;
    }
  | {
      hasEvenLength: true;
      isInvalid: true;
      sequence: number;
      parts: [number, number];
    }
  | {
      hasEvenLength: true;
      isInvalid: false;
      parts: [number, number];
    } {
  const strVal = String(value);
  if (strVal.length % 2 !== 0) {
    return {
      hasEvenLength: false,
      isInvalid: false,
    };
  }
  const parts = [
    strVal.substring(0, strVal.length / 2),
    strVal.substring(strVal.length / 2),
  ];

  if (parts[0] !== parts[1]) {
    return {
      hasEvenLength: true,
      isInvalid: false,
      parts: [Number(parts[0]), Number(parts[1])],
    };
  }

  return {
    hasEvenLength: true,
    isInvalid: true,
    sequence: Number(parts[0]),
    parts: [Number(parts[0]), Number(parts[1])],
  };
}
