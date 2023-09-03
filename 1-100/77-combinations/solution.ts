function combine(n: number, k: number): number[][] {
  const solve = (
    k: number,
    result: number[][] = [],
    idx: number = 1,
    arr: number[] = []
  ): void => {
    if (k === 0) {
      result.push(arr);
      return;
    }

    if (n - idx + 1 < k) return;

    for (let i = idx; i <= n; i++) {
      solve(k - 1, res, i + 1, [...arr, i]);
    }
  };

  const res: number[][] = [];
  solve(k, res);
  return res;
}

const n = 4,
  k = 2;

const res = combine(n, k);

console.log(res);
