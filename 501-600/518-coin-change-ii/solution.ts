function change(amount: number, coins: number[]): number {
  const n = coins.length;
  const dp = Array.from({ length: n + 1 }, () => Array(amount + 1).fill(0));

  for (let i = 0; i < n; i++) {
    dp[i][0] = 1;
  }

  for (let i = n - 1; i >= 0; i--) {
    for (let j = 1; j <= amount; j++) {
      if (coins[i] > j) {
        dp[i][j] = dp[i + 1][j];
      } else {
        dp[i][j] = dp[i + 1][j] + dp[i][j - coins[i]];
      }
    }
  }

  return dp[0][amount];
}

const amount = 5,
  coins = [1, 2, 5];

const res = change(amount, coins);

console.log(res);
