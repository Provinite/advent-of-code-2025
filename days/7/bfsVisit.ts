import type { Node } from "./Node.js";

export function bfsVisit(
  node: Node,
  action: (node: Node) => void,
  getNextNodes: (node: Node) => Iterable<Node> | null,
  shouldVisit: (node: Node) => boolean
) {
  const nodesToVisit = [node];
  while ((node = nodesToVisit.shift()!)) {
    if (!shouldVisit(node)) {
      continue;
    }
    action(node);
    const next = getNextNodes(node) ?? [];
    nodesToVisit.push(...next);
  }
}
