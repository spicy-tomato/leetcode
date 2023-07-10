import { TreeNode } from './tree-node';

function minDepth(root: TreeNode | null, isRoot = true): number {
  if (root === null) {
    return 0;
  }

  if (root.left == null && root.right == null) {
    return 1;
  }

  if (isRoot) {
    if (root.left === null) {
      return minDepth(root.right, true) + 1;
    }

    if (root.right === null) {
      return minDepth(root.left, true) + 1;
    }
  }

  return Math.min(minDepth(root.left, true), minDepth(root.right, true)) + 1;
}
