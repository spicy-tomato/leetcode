function soupServings(n: number): number {
  const operations = [
    [100, 0],
    [75, 25],
    [50, 50],
    [25, 75],
  ];
  const cache = new Map<string, number>();

  const serve = (a: number, b: number, p: number): number => {
    const key = `${a}_${b}`;
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    let res = 0;
    if (a <= 0) {
      if (b <= 0) {
        res = 0.5 * p;
      } else {
        res = p;
      }
    } else {
      if (b > 0) {
        for (const operation of operations) {
          res += serve(a - operation[0], b - operation[1], p * 0.25);
        }
      }
    }

    cache.set(key, res);
    return res;
  };

  return serve(n, n, 1);
}

const n = 4801;

const res = soupServings(n);

console.log(res);
