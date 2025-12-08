import type { Node } from "./Node.js";

export function printGraph(head: Node, indentation = 1) {
  const indent = (str: string) => " ".repeat(indentation) + str;
  console.log(indent(`> ${head.id} (${head.pathsToBase})`));
  for (const destination of head.destinations) {
    printGraph(destination, indentation + 1);
  }
}
