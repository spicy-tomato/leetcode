class Stack {
  private readonly array: number[] = [];

  isEmpty(): boolean {
    return this.array.length === 0;
  }

  add(item: number): void {
    this.array.push(item);
  }

  pop(): number | undefined {
    return this.array.pop();
  }
}

function topologicalSort(
  graph: Map<number, number[]>,
  indegree: number[]
): number[] {
  const visisted: number[] = [];
  const stack = new Stack();
  for (const key of graph.keys()) {
    if (indegree[key] === 0) {
      stack.add(key);
    }
  }

  while (!stack.isEmpty()) {
    const curr = stack.pop()!;
    visisted.push(curr);

    for (const prev of graph.get(curr)!) {
      indegree[prev]--;
      if (indegree[prev] === 0) {
        stack.add(prev);
      }
    }
  }

  return visisted.length === graph.size ? visisted : [];
}

function sortItems(
  n: number,
  m: number,
  group: number[],
  beforeItems: number[][]
): number[] {
  let groupId = m;
  for (let i = 0; i < n; i++) {
    if (group[i] === -1) {
      group[i] = groupId;
      groupId++;
    }
  }

  const itemGraph = new Map<number, number[]>();
  const itemIndegree = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    itemGraph.set(i, []);
  }

  const groupGraph = new Map<number, number[]>();
  const groupIndegree = new Array(groupId).fill(0);
  for (let i = 0; i < groupId; i++) {
    groupGraph.set(i, []);
  }

  for (let curr = 0; curr < n; curr++) {
    for (const prev of beforeItems[curr]) {
      itemGraph.get(prev)?.push(curr);
      itemIndegree[curr]++;

      if (group[curr] !== group[prev]) {
        groupGraph.get(group[prev])?.push(group[curr]);
        groupIndegree[group[curr]]++;
      }
    }
  }

  const itemOrder = topologicalSort(itemGraph, itemIndegree);
  const groupOrder = topologicalSort(groupGraph, groupIndegree);

  if (itemOrder.length === 0 || groupOrder.length === 0) {
    return [];
  }

  const orderedGroup = new Map<number, number[]>();
  for (const item of itemOrder) {
    if (orderedGroup.get(group[item]) === undefined) {
      orderedGroup.set(group[item], []);
    }
    orderedGroup.get(group[item])?.push(item);
  }

  const answerList: number[] = [];
  for (const groupIndex of groupOrder) {
    answerList.push(...(orderedGroup.get(groupIndex) ?? []));
  }

  return answerList;
}

const n = 8,
  m = 2,
  group = [-1, -1, 1, 0, 0, 1, 0, -1],
  beforeItems = [[], [6], [5], [6], [3, 6], [], [], []];

const res = sortItems(n, m, group, beforeItems);

console.log(res);
