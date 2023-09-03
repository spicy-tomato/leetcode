function minExtraChar(s: string, dictionary: string[]): number {
  const n = s.length;
  const dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    for (const word of dictionary) {
      const wLen = word.length;

      if (wLen <= i && s.substring(i - wLen, i) === word) {
        dp[i] = Math.min(dp[i], dp[i - wLen]);
      } else {
        dp[i] = Math.min(dp[i], dp[i - 1] + 1);
      }
    }
  }

  return dp[n];
}

const s = 'sayhelloworld',
  dictionary = ['hello', 'world'];

const res = minExtraChar(s, dictionary);

console.log(res);
