function countOrders(n: number): number {
  const MOD = 1e9 + 7;
  let count = 1;

  for (let i = 2; i <= n; i++) {
    count = (count * (2 * i - 1) * i) % MOD;
  }

  return count;
}

const n = 3;

const res = countOrders(n);

console.log(res);
