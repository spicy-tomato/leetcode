function commonChars(words: string[]): string[] {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const indexMap = new Map<string, number>();
  for (let i = 0; i < 26; i++) {
    indexMap.set(alphabet[i], i);
  }
  const n = words.length;

  const count = Array.from({ length: n }, () => new Array(26).fill(0));

  for (let i = 0; i < n; i++) {
    const word = words[i];
    for (let j = 0; j < word.length; j++) {
      const char = word[j];
      count[i][indexMap.get(char)!]++;
    }
  }

  const res: string[] = [];

  for (let j = 0; j < 26; j++) {
    let min = Infinity;
    for (let i = 0; i < n; i++) {
      min = Math.min(min, count[i][j]);
    }
    if (min > 0) {
      while (min--) {
        res.push(alphabet[j]);
      }
    }
  }

  return res;
}

const words = ["cool","lock","cook"]

const res = commonChars(words);

console.log(res);
