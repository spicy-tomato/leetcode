function isInterleave(s1: string, s2: string, target: string): boolean {
  if (s1.length + s2.length !== target.length) return false;
  if (!s1.length) return s2 === target;
  if (!s2.length) return s1 === target;

  const checkCharacters = (): boolean => {
    const sourceMap = new Map<string, number>();
    const targetMap = new Map<string, number>();

    for (const char of s1) {
      sourceMap.set(char, (sourceMap.get(char) ?? 0) + 1);
    }

    for (const char of s2) {
      sourceMap.set(char, (sourceMap.get(char) ?? 0) + 1);
    }

    for (const char of target) {
      targetMap.set(char, (targetMap.get(char) ?? 0) + 1);
    }

    for (const char of 'abcdefghijklmnopqrstuvwxyz') {
      if (sourceMap.get(char) !== targetMap.get(char)) {
        return false;
      }
    }

    return true;
  };

  const solve = (p1 = 0, p2 = 0, pTarget = 0): boolean => {
    // console.log(p1, p2, pTarget, s1[p1], s2[p2], target[pTarget]);
    if (p1 === s1.length && p2 === s2.length) {
      return true;
    }

    if (p1 === s1.length) {
      return s2.substring(p2) === target.substring(pTarget);
    }

    if (p2 === s2.length) {
      return s1.substring(p1) === target.substring(pTarget);
    }

    return (
      (target[pTarget] === s1[p1] && solve(p1 + 1, p2, pTarget + 1)) ||
      (target[pTarget] === s2[p2] && solve(p1, p2 + 1, pTarget + 1))
    );
  };

  return checkCharacters() && solve();
}

const s1 =
    'abababababababababababababababababababababababababababababababababababababababababababababababababbb',
  s2 =
    'babababababababababababababababababababababababababababababababababababababababababababababababaaaba',
  s3 =
    'abababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababbb';

console.time();
const res = isInterleave(s1, s2, s3);
console.timeEnd();

console.log(res);
