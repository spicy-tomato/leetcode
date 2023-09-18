function kWeakestRows(mat: number[][], k: number): number[] {
  const arr = mat.map((row, i) => ({
    soldiers: row.reduce((acc, curr) => acc + curr, 0),
    i,
  }));

  arr.sort((a, b) =>
    a.soldiers < b.soldiers || (a.soldiers === b.soldiers && a.i < b.i) ? -1 : 1
  );

  const res: number[] = [];

  for (let i = 0; i < k; i++) {
    res.push(arr[i].i);
  }

  return res;
}

const mat = [
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  k = 2;

const res = kWeakestRows(mat, k);

console.log(res);
