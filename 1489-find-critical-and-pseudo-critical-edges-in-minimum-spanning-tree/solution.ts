class UnionFind {
  parent: number[];
  size: number[];
  maxSize: number;

  public constructor(n: number) {
    this.parent = new Array(n);
    this.size = new Array(n);
    this.maxSize = 1;
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
      this.size[i] = 1;
    }
  }

  public find(x: number): number {
    if (x !== this.parent[x]) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  public union(x: number, y: number): boolean {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.size[rootX] < this.size[rootY]) {
        const temp = rootX;
        rootX = rootY;
        rootY = temp;
      }
      this.parent[rootY] = rootX;
      this.size[rootX] += this.size[rootY];
      this.maxSize = Math.max(this.maxSize, this.size[rootX]);
      return true;
    }
    return false;
  }
}

function findCriticalAndPseudoCriticalEdges(
  n: number,
  edges: number[][]
): number[][] {
  const m = edges.length;
  const newEdges = new Array(m);
  for (let i = 0; i < m; i++) {
    newEdges[i] = new Array(4);
    for (let j = 0; j < 3; j++) {
      newEdges[i][j] = edges[i][j];
    }
    newEdges[i][3] = i;
  }

  newEdges.sort((a, b) => a[2] - b[2]);

  const ufStd = new UnionFind(n);
  let stdWeight = 0;
  for (const edge of newEdges) {
    if (ufStd.union(edge[0], edge[1])) {
      stdWeight += edge[2];
    }
  }

  const res = new Array(2);
  res[0] = new Array();
  res[1] = new Array();

  for (let i = 0; i < m; i++) {
    const ufIgnore = new UnionFind(n);
    let ignoreWeight = 0;
    for (let j = 0; j < m; j++) {
      if (i !== j && ufIgnore.union(newEdges[j][0], newEdges[j][1])) {
        ignoreWeight += newEdges[j][2];
      }
    }

    if (ufIgnore.maxSize < n || ignoreWeight > stdWeight) {
      res[0].push(newEdges[i][3]);
    } else {
      const ufForce = new UnionFind(n);
      ufForce.union(newEdges[i][0], newEdges[i][1]);
      let forceWeight = newEdges[i][2];
      for (let j = 0; j < m; j++) {
        if (i !== j && ufForce.union(newEdges[j][0], newEdges[j][1])) {
          forceWeight += newEdges[j][2];
        }
      }
      if (forceWeight === stdWeight) {
        res[1].push(newEdges[i][3]);
      }
    }
  }

  return res;
}

const n = 5,
  edges = [
    [0, 1, 1],
    [1, 2, 1],
    [2, 3, 2],
    [0, 3, 2],
    [0, 4, 3],
    [3, 4, 3],
    [1, 4, 6],
  ];

const res = findCriticalAndPseudoCriticalEdges(n, edges);

console.log(res);
