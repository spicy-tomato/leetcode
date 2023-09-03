function searchMatrix(matrix: number[][], target: number): boolean {
  // Treat last index as possible target placement
  let foundRowIndex = matrix.length - 1;

  // Iterate over each row except last one.
  // If the target is between current row and next, than it might be here.
  for (let i = 0; i < matrix.length - 1; i++) {
    if (target >= matrix[i][0] && target < matrix[i + 1][0]) {
      foundRowIndex = i;
      break;
    }
  }

  // Search the target in found row.
  for (let i = 0; i < matrix[0].length; i++) {
    if (matrix[foundRowIndex][i] === target) return true;
  }

  return false;
}

const matrix = [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60],
  ],
  target = 3;

const res = searchMatrix(matrix, target);

console.log(res);
