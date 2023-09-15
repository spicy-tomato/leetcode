class UnionFind {
  parent: { [key: number]: number };
  rank: { [key: number]: number };
  constructor(length: number) {
    this.parent = {};
    this.rank = {};
    for (let i = 1; i < length + 1; i++) {
      this.parent[i] = i;
      this.rank[i] = 0;
    }
  }

  find(n: number): number {
    let p = this.parent[n];
    while (p !== this.parent[p]) {
      this.parent[p] = this.parent[this.parent[p]];
      p = this.parent[p];
    }
    return p;
  }

  union(n1: number, n2: number): boolean {
    let p1 = this.find(n1),
      p2 = this.find(n2);

    if (p1 === p2) return false;

    if (this.rank[p1] > this.rank[p2]) {
      this.parent[p2] = p1;
    } else if (this.rank[p2] > this.rank[p1]) {
      this.parent[p1] = p2;
    } else {
      this.parent[p1] = p2;
      this.rank[p2] += 1;
    }
    return true;
  }
}

function minCostConnectPoints(points: number[][]): number {
  const n = points.length;
  const minHeap = new MinPriorityQueue({ priority: (item) => item[0] });

  for (let src = 0; src < n; src++) {
    const [x1, y1] = points[src];
    for (let dst = src + 1; dst < n; dst++) {
      const [x2, y2] = points[dst];
      const cost = Math.abs(x1 - x2) + Math.abs(y1 - y2);
      minHeap.enqueue([cost, src, dst]);
    }
  }

  const unionFind = new UnionFind(n);
  let res = 0,
    i = 0;

  // Kruskal's Algorithm
  while (i < n - 1) {
    const [cost, n1, n2] = minHeap.dequeue().element as [
      number,
      number,
      number
    ];
    if (!unionFind.union(n1, n2)) continue;
    res += cost;
    i += 1;
  }
  return res;
}
