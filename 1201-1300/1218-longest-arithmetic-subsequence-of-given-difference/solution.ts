function longestSubsequence(arr: number[], difference: number): number {
  const map = new Map<number, number>();
  const len = arr.length;
  let longest = 0;

  for (let i = 0; i < len; i++) {
    const curr = arr[i];
    const prev = map.get(curr - difference);

    if (!prev) {
      map.set(curr, 1);
      continue;
    }

    map.set(curr, prev + 1);
  }

  for (let value of map.values()) {
    longest = Math.max(longest, value);
  }

  return longest;
}

const arr = [1, 5, 7, 8, 5, 3, 4, 2, 1];
const difference = -2;

const res = longestSubsequence(arr, difference);

console.log(res);
