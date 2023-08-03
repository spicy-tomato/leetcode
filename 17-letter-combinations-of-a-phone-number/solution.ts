function letterCombinations(digits: string): string[] {
  if (!digits) return [];

  const len = digits.length;
  const result: string[] = [];
  const map: Record<string, string> = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  };

  const solve = (idx = 0, res = '') => {
    if (idx === len) {
      result.push(res);
      return;
    }

    const chars = map[digits[idx]];
    for (let i = 0; i < chars.length; i++) {
      solve(idx + 1, res + chars[i]);
    }
  };

  solve();

  return result;
}

const digits = '2';

const res = letterCombinations(digits);

console.log(res);
