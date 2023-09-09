function combinationSum4(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);

  if (nums[0] > target) return 0;
  if (nums[0] === target) return 1;

  const n = nums.length;
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= target; i++) {
    for (let j = 0; j < n; j++) {
      const prevCache = i - nums[j];
      if (prevCache >= 0) {
        dp[i] += dp[prevCache];
      }
    }
  }

  return dp[target];
}

const nums = [1, 2, 3],
  target = 4;

const res = combinationSum4(nums, target);

console.log(res);
