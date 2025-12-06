export const memoize = <A extends any[], R>(
  fn: (...args: A) => R,
  serializeArgs?: (...args: A) => string
) => {
  const cache: Record<string, R> = {};
  return (...args: A): R => {
    if (!serializeArgs) {
      serializeArgs = (...args) => JSON.stringify(args);
    }
    const key = serializeArgs(...args);
    if (Object.hasOwn(cache, key)) {
      return cache[key]!;
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
};
