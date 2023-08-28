function canCross(stones: number[]): boolean {
  if (stones[1] !== 1) return false;
  if (stones.length === 2) return true;

  const target = stones[stones.length - 1];
  const road = new Set<number>();
  const mark = new Set<string>();
  const changes = [-1, 0, 1];

  for (const stone of stones) {
    road.add(stone);
  }

  const solve = (pos = 1, jump = 1): boolean => {
    for (const change of changes) {
      const nextJump = jump + change;

      if (nextJump <= 0) {
        continue;
      }

      const nextPos = pos + nextJump;
      if (nextPos === target) {
        return true;
      }

      if (!road.has(nextPos) || mark.has(`${nextPos}_${nextJump}`)) {
        continue;
      }

      if (solve(nextPos, nextJump)) {
        return true;
      }
    }

    mark.add(`${pos}_${jump}`);
    return false;
  };

  return solve();
}

const stones = [
  0, 1, 2, 5, 6, 9, 10, 12, 13, 14, 17, 19, 20, 21, 26, 27, 28, 29, 30,
];

console.time();
const res = canCross(stones);
console.timeEnd();

console.log(res);
