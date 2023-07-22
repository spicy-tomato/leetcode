const dp = (
  idx: number,
  nums: number[],
  mem: Record<number, [number, number]>
): [number, number] => {
  if (mem[idx]) return mem[idx];

  let n = idx === -1 ? -Infinity : nums[idx];
  let max = 1;
  let count = 1;

  for (let i = idx + 1; i < nums.length; i++) {
    if (nums[i] > n) {
      let [c, m] = dp(i, nums, mem);
      if (max === m + 1) {
        count += c;
      }
      if (max < m + 1) {
        max = m + 1;
        count = c;
      }
    }
  }

  mem[idx] = [count, max];
  return mem[idx];
};

function findNumberOfLIS(nums: number[]): number {
  let mem = {};
  let [count, _] = dp(-1, nums, mem);
  return count;
}

const nums = [2, 2, 2, 2, 2];

const res = findNumberOfLIS(nums);

console.log(res);
