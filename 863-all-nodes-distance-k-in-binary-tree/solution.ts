import { TreeNode } from '.';

function distanceK(
  root: TreeNode | null,
  target: TreeNode | null,
  k: number
): number[] {
  if (!root || !target) return [];

  if (k === 0) return [target.val];

  const parents: Record<number, TreeNode> = {};

  const dfs = (node: TreeNode): void => {
    if (node.left) {
      parents[node.left.val] = node;
      dfs(node.left);
    }
    if (node.right) {
      parents[node.right.val] = node;
      dfs(node.right);
    }
  };

  const findChild = (node: TreeNode, distance: number): number[] => {
    const result: number[] = [];

    if (distance === 0) {
      return [node.val];
    }

    if (distance === 1) {
      if (node.left) result.push(node.left.val);
      if (node.right) result.push(node.right.val);
      return result;
    }

    const left = node.left ? findChild(node.left, distance - 1) : [];
    const right = node.right ? findChild(node.right, distance - 1) : [];
    return [...left, ...right];
  };

  const findAncestor = (node: TreeNode, distance: number): number[] => {
    const parent = parents[node.val];
    if (!parent) return [];

    if (distance === 1) return [parent.val];

    const ancestor = findAncestor(parent, distance - 1);

    let sibling: number[] = [];
    if (parent.left?.val === node.val) {
      if (parent.right) {
        sibling = findChild(parent.right, distance - 2);
      }
    } else {
      if (parent.left) {
        sibling = findChild(parent.left, distance - 2);
      }
    }

    return [...ancestor, ...sibling];
  };

  dfs(root);
  const child = findChild(target, k);
  const ancestor = findAncestor(target, k);

  return [...child, ...ancestor];
}

function arrayToTreeNode(arr: (number | null)[]): TreeNode | null {
  if (!arr[0]) return null;

  const root = new TreeNode(arr[0]);
  root.left = buildLeft(0, arr);
  root.right = buildRight(0, arr);

  return root;
}

function buildLeft(currIdx: number, arr: (number | null)[]): TreeNode | null {
  const leftIdx = 2 * currIdx + 1;
  if (leftIdx >= arr.length || !arr[leftIdx]) return null;

  const leftChild = new TreeNode(arr[leftIdx]!);
  leftChild.left = buildLeft(leftIdx, arr);
  leftChild.right = buildRight(leftIdx, arr);
  return leftChild;
}

function buildRight(currIdx: number, arr: (number | null)[]): TreeNode | null {
  const rightIdx = 2 * currIdx + 2;
  if (rightIdx >= arr.length || !arr[rightIdx]) return null;

  const rightChild = new TreeNode(arr[rightIdx]!);
  rightChild.left = buildLeft(rightIdx, arr);
  rightChild.right = buildRight(rightIdx, arr);
  return rightChild;
}

function bfs(root: TreeNode | null, target: number): TreeNode | null {
  if (!root) return null;

  if (root === null) return null;
  if (root.val === target) return root;

  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const node = queue.shift()!;

    if (node.left?.val === target) return node.left;
    if (node.right?.val === target) return node.right;
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return null;
}

const s = [1];
const target = 1;
const k = 3;

const transformed_s = arrayToTreeNode(s);
const transformed_target = bfs(transformed_s, target);

console.time();
const res = distanceK(transformed_s, transformed_target, k);
console.timeEnd();

console.log(res);
