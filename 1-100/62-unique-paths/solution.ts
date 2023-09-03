function uniquePaths(rows: number, cols: number): number {
  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let i = 0; i < rows; i++) {
    dp[i][0] = 1;
  }

  for (let i = 1; i < cols; i++) {
    dp[0][i] = 1;
  }

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[rows - 1][cols - 1];
}

const m = 3,
  n = 7;

const res = uniquePaths(m, n);

console.log(res);
