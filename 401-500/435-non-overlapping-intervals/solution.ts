function eraseOverlapIntervals(intervals: number[][]): number {
  let prev = -Infinity;
  let res = 0;

  intervals.sort((a, b) => a[1] - b[1]);

  for (let int of intervals) {
    if (int[0] < prev) {
      res++;
    } else {
      prev = int[1];
    }
  }

  return res;
}

const intervals = [
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 3],
];

console.time();
const res = eraseOverlapIntervals(intervals);
console.timeEnd();

console.log(res);
