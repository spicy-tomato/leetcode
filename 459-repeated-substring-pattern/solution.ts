function getDivisors(n: number): number[] {
  const result = [1];

  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      result.push(i);
      if (i * i < n) {
        result.push(n / i);
      }
    }
  }

  return result;
}

function repeatedSubstringPattern(s: string): boolean {
  if (s.length <= 1) return false;

  const n = s.length;
  const divisors = getDivisors(n);

  for (const length of divisors) {
    const occurence = n / length;
    const subStr = s.substring(0, length);
    let str = '';

    for (let i = 0; i < occurence; i++) {
      str += subStr;
    }

    if (str === s) {
      return true;
    }
  }

  return false;
}

const s = 'abcabcabcabc';

const res = repeatedSubstringPattern(s);

console.log(res);
