function longestStrChain(words: string[]): number {
  const lenMap = new Map<number, string[]>();
  const memo = new Map<string, number>();

  for (const w of words) {
    const len = w.length;
    if (!lenMap.has(len)) {
      lenMap.set(len, []);
    }
    lenMap.get(len)!.push(w);
  }

  const isPredecessor = (sm: string, lg: string): boolean => {
    if (lg.length - sm.length !== 1) return false;

    let i = 0,
      j = 0;
    while (i < sm.length && j < lg.length) {
      if (sm[i] !== lg[j]) {
        if (j < lg.length - 1 && lg[j + 1] === sm[i]) {
          j++;
        } else {
          return false;
        }
      }
      i++;
      j++;
    }
    return true;
  };

  const dfs = (word: string): number => {
    if (memo.get(word)) return memo.get(word)!;
    let maxChain = 1;
    let curLen = word.length;
    const candidates = lenMap.get(curLen + 1) || [];
    for (const c of candidates) {
      if (isPredecessor(word, c)) {
        maxChain = Math.max(1 + dfs(c), maxChain);
      }
    }

    memo.set(word, maxChain);
    return maxChain;
  };

  let globalMax = 1;
  for (const w of words) {
    globalMax = Math.max(dfs(w), globalMax);
  }
  return globalMax;
}

const words = ['a', 'b', 'ba', 'bca', 'bda', 'bdca'];

const res = longestStrChain(words);

console.log(res);
