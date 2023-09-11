function groupThePeople(groupSizes: number[]): number[][] {
  const map = new Map<number, number[][]>();
  const n = groupSizes.length;

  for (let i = 0; i < n; i++) {
    const size = groupSizes[i];
    let groups = map.get(size);
    if (groups) {
      const lastGroup = groups[groups.length - 1];
      if (lastGroup.length < size) {
        lastGroup.push(i);
      } else {
        groups.push([i]);
      }
    } else {
      map.set(size, [[i]]);
    }
  }

  const result: number[][] = []

  for (const [_, values] of map) {
    result.push(...values)
  }

  return result;
}

const groupSizes = [3, 3, 3, 3, 3, 1, 3];

const res = groupThePeople(groupSizes);

console.log(res);
