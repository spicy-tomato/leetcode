function minimumReplacement(nums: number[]): number {
  let answer = 0;
  const n = nums.length;

  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] <= nums[i + 1]) {
      continue;
    }

    const numElements = Math.floor((nums[i] + nums[i + 1] - 1) / nums[i + 1]);
    answer += numElements - 1;
    nums[i] = Math.floor(nums[i] / numElements);
  }

  return answer;
}

const nums = [1, 2, 3, 4, 5];

const res = minimumReplacement(nums);

console.log(res);
