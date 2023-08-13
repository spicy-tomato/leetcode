function validPartition(nums: number[]): boolean {
  const n = nums.length;
  const cache = new Array(n).fill(false);

  const solve = (idx = 0): boolean => {
    if (idx === n - 1 || idx > n) return false;
    if (idx === n) return true;

    if (cache[idx]) return false;

    const op1 = nums[idx] === nums[idx + 1] && solve(idx + 2);
    if (op1) return true;

    if (idx === n - 2) return false;

    const op2 =
      ((nums[idx] === nums[idx + 1] && nums[idx] === nums[idx + 2]) ||
        (nums[idx] === nums[idx + 1] - 1 && nums[idx] === nums[idx + 2] - 2)) &&
      solve(idx + 3);

    if (op2) return true;

    cache[idx] = true;
    return false;
  };

  return solve();
}

const nums = [4, 4, 4, 5, 6];

const res = validPartition(nums);

console.log(res);
