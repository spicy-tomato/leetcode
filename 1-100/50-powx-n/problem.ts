function myPow(x: number, n: number): number {
  if (x === 1 || x === 0) return x;
  if (n === 0) return 1;
  if (x === -1) return n % 2 === 0 ? 1 : -1;

  let acc = 1;
  const abs = Math.abs(n);

  for (let i = 1; i <= abs; i++) {
    acc *= x;
  }

  if (n < 0) return 1 / acc;

  return acc;
}

const x = -1;
const n = 2147483647;

const res = myPow(x, n);

console.log(res);
