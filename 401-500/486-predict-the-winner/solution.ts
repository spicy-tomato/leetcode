function PredictTheWinner(nums: number[]): boolean {
  const dfs = (left: number, right: number, turn = 0): number[] => {
    const points = [0, 0];

    if (left === right) {
      points[turn] = nums[left];
      return points;
    }

    const pickLeft = dfs(left + 1, right, 1 - turn);
    const pickRight = dfs(left, right - 1, 1 - turn);

    if (pickLeft[turn] + nums[left] >= pickRight[turn] + nums[right]) {
      points[turn] = pickLeft[turn] + nums[left];
      points[1 - turn] = pickLeft[1 - turn];
    } else {
      points[turn] = pickRight[turn] + nums[right];
      points[1 - turn] = pickRight[1 - turn];
    }

    return points;
  };

  const res = dfs(0, nums.length - 1);

  return res[0] >= res[1];
}

const nums = [1, 5, 2];

const res = PredictTheWinner(nums);

console.log(res);
