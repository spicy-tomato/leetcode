function minimumEffortPath(heights: number[][]): number {
  const rows = heights.length;
  const cols = heights[0].length;
  const distance = Array.from(Array(rows), () => Array(cols).fill(Infinity));
  const minHeap: [number, number, number][] = [[0, 0, 0]]; // [effort, x, y]

  distance[0][0] = 0;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (minHeap.length > 0) {
    const [effort, x, y] = minHeap.shift()!;

    if (effort > distance[x][y]) continue;

    if (x === rows - 1 && y === cols - 1) return effort;

    for (const [dx, dy] of directions) {
      const nx = x + dx,
        ny = y + dy;
      if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
        const newEffort = Math.max(
          effort,
          Math.abs(heights[x][y] - heights[nx][ny])
        );
        if (newEffort < distance[nx][ny]) {
          distance[nx][ny] = newEffort;
          minHeap.push([newEffort, nx, ny]);
          minHeap.sort((a, b) => a[0] - b[0]);
        }
      }
    }
  }
  return -1;
}

const heights = [
  [1, 2, 2],
  [3, 8, 2],
  [5, 3, 5],
];

const res = minimumEffortPath(heights);

console.log(res);
