function search(nums: number[], target: number): boolean {
  const solve = (start: number, end: number): boolean => {
    const mid = Math.ceil((start + end) / 2);
    console.log(start, end, mid)

    if (nums[start] === target || nums[end] === target || nums[mid] === target)
      return true;
    if (start >= end - 1) return false;

    if (nums[start] === nums[end])
      return solve(start, mid - 1) || solve(mid + 1, end);

    if (nums[start] <= nums[mid]) {
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

const nums = [2,2,2,0,1];
const target = 0;

const res = search(nums, target);

console.log(res);
