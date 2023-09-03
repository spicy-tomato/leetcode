function asteroidCollision(asteroids: number[]): number[] {
  const len = asteroids.length;
  const stack: number[] = [];

  for (let i = 0; i < len; i++) {
    const curr = asteroids[i];

    if (curr > 0 || stack.length === 0 || stack[stack.length - 1] < 0) {
      stack.push(curr);
      continue;
    }

    if (stack[stack.length - 1] === -curr) {
      stack.pop();
      continue;
    }

    if (0 < stack[stack.length - 1] && stack[stack.length - 1] < -curr) {
      while (
        stack.length &&
        0 < stack[stack.length - 1] &&
        stack[stack.length - 1] < -curr
      ) {
        stack.pop();
      }

      if (stack.length === 0 || stack[stack.length - 1] < 0) {
        stack.push(curr);
      } else if (stack[stack.length - 1] === -curr) {
        stack.pop();
      }
    }
  }

  return stack;
}

const asteroids = [-2, 2, 1, -2];

const res = asteroidCollision(asteroids);

console.log(res);
