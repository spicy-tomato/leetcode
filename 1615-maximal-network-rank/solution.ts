function maximalNetworkRank(n: number, roads: number[][]): number {
  const map = new Map<string, boolean>();
  const count = new Array(n).fill(0);

  for (let i = 0; i < roads.length; i++) {
    count[roads[i][0]]++;
    count[roads[i][1]]++;
    const left = roads[i][0] < roads[i][1] ? roads[i][0] : roads[i][1];
    const right = roads[i][0] < roads[i][1] ? roads[i][1] : roads[i][0];
    map.set(`${left}_${right}`, true);
  }

  let res = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j <= n - 1; j++) {
      let curr = count[i] + count[j];
      if (map.has(`${i}_${j}`)) {
        curr--;
      }
      res = Math.max(res, curr);
    }
  }

  return res;
}

const n = 2,
  roads = [[1, 0]];

const res = maximalNetworkRank(n, roads);

console.log(res);
