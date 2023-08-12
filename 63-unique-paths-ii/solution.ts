function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const w = obstacleGrid[0].length;
  const h = obstacleGrid.length;

  if (obstacleGrid[0][0] || obstacleGrid[h - 1][w - 1]) return 0;

  const dp = Array.from({ length: h }, () => new Array(w).fill(0));
  dp[h - 1][w - 1] = 1;

  for (let i = h - 1; i >= 0; i--) {
    for (let j = w - 1; j >= 0; j--) {
      if (obstacleGrid[i][j] || !dp[i][j]) continue;

      if (j > 0 && !obstacleGrid[i][j - 1]) dp[i][j - 1] += dp[i][j];
      if (i > 0 && !obstacleGrid[i - 1][j]) dp[i - 1][j] += dp[i][j];
    }
  }

  return dp[0][0];
}

const obstacleGrid = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0],
];

const res = uniquePathsWithObstacles(obstacleGrid);

console.log(res);
