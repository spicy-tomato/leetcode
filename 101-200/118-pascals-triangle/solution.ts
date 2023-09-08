function generate(numRows: number): number[][] {
  const res = [[1]];

  if (numRows === 1) return res;

  for (let i = 1; i < numRows; i++) {
    const arr = [1];
    for (let j = 0; j < res[i - 1].length - 1; j++) {
      arr.push(res[i - 1][j] + res[i - 1][j + 1]);
    }
    arr.push(1);
    res.push(arr);
  }

  return res;
}

const numRows = 5;

const res = generate(numRows);

console.log(res);
