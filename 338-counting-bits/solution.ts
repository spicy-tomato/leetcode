function countBits(n: number): number[] {
  const res: number[] = [];

  for (let i = 0; i <= n; i++) {
    let count = 0;
    let curr = i;
    while (curr > 0) {
      if (curr & 1) count++;
      curr >>= 1;
    }
    res.push(count);
  }

  return res;
}

const n = 5;

const res = countBits(n);

console.log(res);
