function maxSlidingWindow(nums: number[], k: number): number[] {
  const n = nums.length;
  const res: number[] = [];
  let cache: number[] = [];

  for (let end = 0; end < n; end++) {
    const start = end - k + 1;

    cache = cache.filter((val) => val >= start && nums[val] > nums[end]);
    cache.push(end);

    if (end >= k - 1) {
      res.push(nums[cache[0]]);
    }
  }

  return res;
}

const nums = [1, 3, 1, 2, 0, 5],
  k = 3;

const res = maxSlidingWindow(nums, k);

console.log(res);
