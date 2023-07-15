function maxValue(events: number[][], k: number): number {
  const dp: Record<number, Record<number, number>> = Array(events.length)
    .fill(0)
    .reduce((acc, _, idx) => {
      acc[idx] = {};
      return acc;
    }, {});

  const findNext = (minStart: number, curr: number): number => {
    curr++;
    minStart++;
    while (curr < events.length) {
      if (events[curr][0] >= minStart) return curr;
      curr++;
    }
    return -1;
  };

  const solve = (count: number, idx: number): number => {
    if (idx === -1 || idx >= events.length || count === 0) {
      return 0;
    }

    if (dp[idx][count] !== undefined) {
      return dp[idx][count];
    }

    const nextIdx = findNext(events[idx][1], idx);

    // take
    const op1 = events[idx][2] + solve(count - 1, nextIdx);

    // skip
    const op2 = solve(count, idx + 1);

    dp[idx][count] = Math.max(op1, op2);

    // console.log(op1, op2, nextIdx);
    // console.log(dp);

    return dp[idx][count];
  };

  events.sort((a, b) =>
    a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]) ? -1 : 1
  );

  const res = solve(k, 0);
  // console.log(dp);

  return res;
}

const events = [
  [1, 1, 1],
  [2, 2, 2],
  [3, 3, 3],
  [4, 4, 4],
];
const k = 3;

const res = maxValue(events, k);

console.log(res);
