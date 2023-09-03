function knightProbability(
  n: number,
  k: number,
  row: number,
  column: number
): number {
  const directions = [
    [-2, -1],
    [-1, -2],
    [-2, 1],
    [-1, 2],
    [2, -1],
    [1, -2],
    [2, 1],
    [1, 2],
  ];
  const cache = new Map<string, number>();

  const dfs = (r: number, c: number, step: number): number => {
    if (step === k) return 1;

    let ways = 0;

    for (let i = 0; i < 8; i++) {
      const [diffR, diffC] = directions[i];
      const newR = r + diffR;
      const newC = c + diffC;

      if (0 <= newR && newR < n && 0 <= newC && newC < n) {
        const cacheValue = cache.get(`${newR}_${newC}_${step + 1}`);
        ways += cacheValue ?? dfs(newR, newC, step + 1);
      }
    }

    cache.set(`${r}_${c}_${step}`, ways);

    return ways;
  };

  let ways = dfs(row, column, 0);

  for (let i = 0; i < k; i++) {
    ways /= 8;
  }

  return ways;
}

const n = 8;
const k = 30;
const row = 0;
const column = 0;

const res = knightProbability(n, k, row, column);

console.log(res);
