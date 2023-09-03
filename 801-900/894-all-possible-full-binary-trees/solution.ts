import { TreeNode } from '.';

function allPossibleFBT(n: number): Array<TreeNode | null> {
  const cache = new Map<number, Array<TreeNode | null>>();

  const solve = (n: number): Array<TreeNode | null> => {
    if (n % 2 === 0) return [];

    if (n === 1) return [new TreeNode(0)];

    const cacheValue = cache.get(n);
    if (cacheValue) return cacheValue;

    let result: TreeNode[] = [];

    for (let leftCount = 1; leftCount < n; leftCount += 2) {
      const rightCount = n - leftCount - 1;
      const left = cache.get(leftCount) ?? allPossibleFBT(leftCount);
      const right = cache.get(rightCount) ?? allPossibleFBT(rightCount);

      for (let l = 0; l < left.length; l++) {
        for (let r = 0; r < right.length; r++) {
          const node = new TreeNode(0, left[l], right[r]);
          result.push(node);
        }
      }
    }

    cache.set(n, result);

    return result;
  };

  return solve(n);
}

const n = 7;

const res = allPossibleFBT(n);

console.log(res);
