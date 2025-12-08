import { bfsVisit } from "./bfsVisit.js";
import type { Node } from "./Node.js";

export function calculatePaths(node: Node) {
  bfsVisit(
    node,
    (node) => {
      let pathsToBase = 0;
      for (const destination of node.destinations) {
        // we haven't visited all of the nodes downstream from this one yet
        // so we can't determine its total # of paths yet (but we can anticipate coming
        // back to it later through some other path)
        if (!destination.pathsToBase) {
          return;
        }
        pathsToBase += destination.pathsToBase;
      }
      node.pathsToBase = Math.max(
        // no less than the number of destinations from here
        // except for the case where there are no destinations
        // which has 1 trivial path (it is the end-node)
        Math.max(1, node.destinations.length),
        pathsToBase
      );
    },
    (node) => {
      // do not pass this node until we have its details
      if (!node.pathsToBase) {
        return null;
      }
      return node.sources;
    },
    (node) => !node.pathsToBase
  );
}
