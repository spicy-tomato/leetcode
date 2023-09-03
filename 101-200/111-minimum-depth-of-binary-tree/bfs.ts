import { TreeNode } from './tree-node';

function minDepth(root: TreeNode | null, isRoot = true): number {
  if (!root) return 0;

  const queue: { node: TreeNode; depth: number }[] = [{ node: root, depth: 1 }];

  while (queue.length > 0) {
    const { node, depth } = queue.shift()!;

    if (!node.left && !node.right) {
      return depth;
    }

    if (node.left) queue.push({ node: node.left, depth: depth + 1 });
    if (node.right) queue.push({ node: node.right, depth: depth + 1 });
  }

  return 0;
}
