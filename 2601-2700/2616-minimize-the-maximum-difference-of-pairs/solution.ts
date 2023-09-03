function minimizeMax(nums: number[], p: number): number {
  if (nums.length < 2) return 0;

  const count = (threshold: number): number => {
    let idx = 0;
    let count = 0;

    while (idx < n - 1) {
      if (nums[idx + 1] - nums[idx] <= threshold) {
        count++;
        idx += 2;
      } else {
        idx++;
      }
    }

    return count;
  };

  nums.sort((a, b) => a - b);

  const n = nums.length;
  let left = 0;
  let right = nums[n - 1] - nums[0];

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (count(mid) >= p) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

const nums = [10, 1, 2, 7, 1, 3],
  p = 2;

const res = minimizeMax(nums, p);

console.log(res);
