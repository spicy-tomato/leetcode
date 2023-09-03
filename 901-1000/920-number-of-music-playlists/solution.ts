function numMusicPlaylists(n: number, goal: number, k: number): number {
  const mod = 1_000_000_000 + 7;
  const dp = Array.from({ length: goal + 1 }, () =>
    Array<number>(n + 1).fill(0)
  );

  dp[0][0] = 1;

  for (let i = 1; i <= goal; i++) {
    const maxJ = Math.min(i, n);
    for (let j = 1; j <= maxJ; j++) {
      dp[i][j] = dp[i - 1][j - 1] * (n - j + 1);
      if (j > k) dp[i][j] += dp[i - 1][j] * (j - k);
      dp[i][j] %= mod;
    }
  }

  return dp[goal][n];
}

const n = 2,
  goal = 3,
  k = 0;

const res = numMusicPlaylists(n, goal, k);

console.log(res);
