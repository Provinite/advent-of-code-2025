export function getColumnDelimiters(input: string) {
  const spaces: Set<number>[] = [];
  for (const line of input.split("\n")) {
    const set = new Set<number>();
    spaces.push(set);
    for (let col = 0; col < line.length; ++col) {
      if (line[col] === " ") {
        set.add(col);
      }
    }
  }

  return [
    ...spaces.reduce((a, b) => {
      return a.intersection(b);
    }, spaces[0]!),
  ].sort((a, b) => a - b);
}
