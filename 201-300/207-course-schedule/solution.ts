function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const matrix: number[][] = [];
  const mark = Array(numCourses).fill(false);

  for (let i = 0; i < numCourses; i++) {
    matrix.push([]);
  }

  for (let i = 0; i < prerequisites.length; i++) {
    const [subject, required] = prerequisites[i];
    if (required === subject) return false;

    matrix[subject].push(required);
  }

  // console.log(matrix);

  for (let i = 0; i < numCourses; i++) {
    // console.log(`mark ${i}`);
    if (mark[i] || matrix[i].length === 0) continue;

    const stack = matrix[i];
    const visited = Array(numCourses).fill(false);

    while (stack.length) {
      // console.log(stack);
      const curr = stack.pop()!;
      if (visited[curr]) continue;

      const len = matrix[curr].length;

      for (let j = 0; j < len; j++) {
        if (visited[matrix[curr][j]]) continue;
        if (matrix[curr][j] === i) return false;
        stack.push(matrix[curr][j]);
      }

      visited[curr] = true;
    }
  }

  return true;
}

const numCourses = 4;
const prerequisites: number[][] = [
  [2, 0],
  [1, 0],
  [3, 1],
  [3, 2],
  [1, 3],
];

const res = canFinish(numCourses, prerequisites);

console.log(res);
