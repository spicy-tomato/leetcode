function search(nums: number[], target: number): number {
  const solve = (start: number, end: number): number => {
    const mid = Math.ceil((start + end) / 2);

    if (nums[start] === target) return start;
    if (nums[end] === target) return end;
    if (nums[mid] === target) return mid;
    if (start >= end - 1) return -1;

    if (nums[start] < nums[mid]) {
      // left is sorted
      if (nums[start] < target && target < nums[mid])
        return solve(start, mid - 1);
      return solve(mid + 1, end);
    }

    // right is sorted
    if (nums[mid] < target && target < nums[end]) return solve(mid + 1, end);

    return solve(start, mid - 1);
  };

  return solve(0, nums.length - 1);
}

const nums = [4, 5, 6, 7, 0, 1, 2],
  target = 5;

const res = search(nums, target);

console.log(res);
