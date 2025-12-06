import { memoize } from "./memoize.js";
import { Neighborhood } from "./Neighborhood.js";
import { NeighborhoodPosition } from "./NeighborhoodPosition.js";

export const isAccessible = () =>
  memoize(
    (neighborhood: Neighborhood) => {
      let count = 0;
      for (const [position, value] of neighborhood) {
        if (position === NeighborhoodPosition.Center) {
          if (!value) {
            return false;
          }
          continue;
        }
        if (value) ++count;
      }
      return count < 4;
    },
    (neighborhood) => neighborhood.value.toString(2).padStart(9, "0")
  );
