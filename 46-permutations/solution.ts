function permute(nums: number[]): number[][] {
  const len = nums.length;
  const result: number[][] = [];

  const solve = (checked: boolean[], count = 0, res: number[] = []) => {
    if (count === len) {
      result.push(res);
      return;
    }

    for (let i = 0; i < len; i++) {
      if (!checked[i]) {
        checked[i] = true;
        solve(checked, count + 1, [...res, nums[i]]);
        checked[i] = false;
      }
    }
  };

  solve(nums.map(() => false));

  return result;
}

const nums = [1, 2, 3];

const res = permute(nums);

console.log(res);
