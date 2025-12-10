export class SegmentedSet<T> {
  sets: Set<Set<T>> = new Set();
  map = new Map<T, Set<T>>();
  setFor(item: T) {
    return this.map.get(item)!;
  }

  constructor(items: Iterable<T>) {
    for (const item of items) {
      const set = new Set<T>().add(item);
      this.sets.add(set);
      this.map.set(item, set);
    }
  }

  friends(a: T, b: T) {
    return this.setFor(a) === this.setFor(b);
  }

  makeFriends(a: T, b: T) {
    return this.mergeSets(this.setFor(a), this.setFor(b));
  }

  mergeSets(...sets: Set<T>[]) {
    if (sets.length < 2) {
      return;
    }

    const union = sets.reduce((acc, inductee) => {
      this.sets.delete(inductee);
      return acc.union(inductee);
    }, new Set());
    this.sets.add(union);
    for (const el of union) {
      this.map.set(el, union);
    }
  }
}
