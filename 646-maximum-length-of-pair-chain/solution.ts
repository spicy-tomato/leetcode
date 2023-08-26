function findLongestChain(pairs: number[][]): number {
  pairs.sort(([a1, b1], [a2, b2]) =>
    b1 < b2 || (b1 === b2 && a1 > a2) ? -1 : 1
  );

  let last = -Infinity;
  let result = 0;

  for (const [a, b] of pairs) {
    if (a > last) {
      result++;
      last = b;
    }
  }

  return result;
}

const pairs = [
  [1, 2],
  [7, 8],
  [4, 5],
];

const res = findLongestChain(pairs);

console.log(res);
