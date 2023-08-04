function wordBreak(s: string, wordDict: string[]): boolean {
  const n = s.length;
  const dp = Array(n + 1).fill(false);
  const set = new Set(wordDict);

  dp[n] = true;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n + 1; j++) {
      if (dp[j] && set.has(s.slice(i, j))) {
        dp[i] = true;
        continue;
      }
    }
  }

  return dp[0];
}

const s =
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const wordDict = [
  'aa',
  'aaa',
  'aaaa',
  'aaaaa',
  'aaaaaa',
  'aaaaaaa',
  'aaaaaaaa',
  'aaaaaaaaa',
  'aaaaaaaaaa',
  'ba',
];

console.time();
const res = wordBreak(s, wordDict);
console.timeEnd();

console.log(res);
