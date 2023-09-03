function updateMatrix(mat: number[][]): number[][] {
  const row = mat.length;
  const col = mat[0].length;
  const res = Array.from({ length: row }, () => Array(col));
  const queue: [number, number, number][] = [];

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      res[i][j] = row + col;
      if (mat[i][j] === 0) queue.push([i, j, 0]);
    }
  }

  while (queue.length) {
    const [r, c, count] = queue.shift()!;

    if (res[r][c] > count) {
      res[r][c] = count;

      if (r > 0) queue.push([r - 1, c, count + 1]);
      if (c > 0) queue.push([r, c - 1, count + 1]);
      if (r < row - 1) queue.push([r + 1, c, count + 1]);
      if (c < col - 1) queue.push([r, c + 1, count + 1]);
    }
  }

  return res;
}

const mat = [
  [0, 0, 0],
  [0, 1, 0],
  [1, 1, 1],
];

const res = updateMatrix(mat);

console.log(res);
