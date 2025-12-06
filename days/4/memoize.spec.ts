import { memoize } from "./memoize.js";

describe("memoize", () => {
  it("memoizes", () => {
    const fn = jest.fn((v) => v);
    const memo = memoize(fn);

    expect(fn).not.toHaveBeenCalled();
    let result = memo(0);
    expect(fn).toHaveBeenCalledWith(0);
    expect(result).toBe(0);

    result = memo(1);
    expect(fn).toHaveBeenCalledWith(0);
    expect(result).toBe(1);

    fn.mockClear();
    result = memo(0);
    expect(fn).not.toHaveBeenCalled();
    expect(result).toBe(0);

    result = memo(1);
    expect(fn).not.toHaveBeenCalled();
    expect(result).toBe(1);

    result = memo(2);
    expect(fn).toHaveBeenCalledWith(2);
    expect(result).toBe(2);
  });
});
