import { Node } from "./Node.js";
export function inputToNode(input: string): { head: Node; tail: Node } {
  const lines = input.split("\n");
  const startColumn = input.indexOf("S");
  const head = new Node(`source @ ${startColumn}`);
  const width = input.indexOf("\n");

  /**
   * A map of column numbers to the nodes that can supply them.
   * So this could be:
   * - The start node, in that column
   * - A splitter in an adjacent column
   */
  const nodes: Record<number, Set<Node>> = { [startColumn]: new Set([head]) };

  let beams = new Set<number>();
  beams.add(startColumn);

  const addSource = (column: number, node: Node) => {
    if (!nodes[column]) {
      nodes[column] = new Set();
    }
    nodes[column].add(node);
  };

  const removeSources = (column: number) => {
    if (nodes[column]) {
      nodes[column] = new Set();
    }
  };

  for (let row = 0; row < lines.length; ++row) {
    const toRemove = new Set<number>();
    const toAdd = new Set<number>();
    const sourcesToAdd: [number, Node][] = [];

    for (const beam of beams) {
      if (lines[row]![beam] === "^") {
        const node = new Node(`splitter @ ${row}, ${beam}`);
        const sources = nodes[beam];
        if (sources) {
          sources.forEach((s) => s.addDestination(node));
        }
        toRemove.add(beam);
        if (beam > 0) {
          sourcesToAdd.push([beam - 1, node]);
          toAdd.add(beam - 1);
        }
        if (beam < width - 1) {
          sourcesToAdd.push([beam + 1, node]);
          toAdd.add(beam + 1);
        }
      }
    }

    beams = beams.difference(toRemove).union(toAdd);
    toRemove.forEach((c) => removeSources(c));
    sourcesToAdd.forEach(([c, n]) => addSource(c, n));
  }

  const tail = new Node("tail");
  for (const set of Object.values(nodes)) {
    set.forEach((n) => tail.addSource(n));
  }
  return { head, tail };
}
