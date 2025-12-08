/**
 * A node is either:
 * - The initial beam position (1 child)
 * - A splitter (1-2 children)
 * - A sentinel terminal node that represents the end of the board (0 children)
 */
export class Node {
  constructor(public id: string) {}
  sources: Node[] = [];
  destinations: Node[] = [];
  pathsToBase = 0;

  addSource(node: Node) {
    this.sources.push(node);
    node.destinations.push(this);
  }

  addDestination(node: Node) {
    this.destinations.push(node);
    node.sources.push(this);
  }
}
