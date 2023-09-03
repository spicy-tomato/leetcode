function minTaps(n: number, ranges: number[]): number {
  const dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i <= n; i++) {
    const tapStart = Math.max(0, i - ranges[i]);
    const tapEnd = Math.min(n, i + ranges[i]);

    for (let j = tapStart; j <= tapEnd; j++) {
      dp[tapEnd] = Math.min(dp[tapEnd], dp[j] + 1);
    }
  }

  if (dp[n] === Infinity) {
    return -1;
  }

  return dp[n];
}

const n = 3,
  ranges = [0, 0, 0, 0];

const res = minTaps(n, ranges);

console.log(res);
