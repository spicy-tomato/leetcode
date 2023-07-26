function minSpeedOnTime(dist: number[], hour: number): number {
  if (dist.length - 1 > hour) return -1;

  let left = 1;
  let right = 10 ** 7;
  const n = dist.length;

  function checkSpeed(speed: number): number {
    let hourTaken = 0;

    for (let i = 0; i < n - 1; i++) {
      const distance = dist[i];
      hourTaken += Math.ceil(distance / speed);
    }
    hourTaken += dist[n - 1] / speed;
    return hourTaken;
  }

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    const hourTaken = checkSpeed(mid);
    // console.log(mid, left, right, hourTaken)
    if (hourTaken > hour) {
      // too slow
      left = mid + 1;
    } else if (hourTaken < hour) {
      // too fast
      right = mid;
    } else {
      left = mid;
      right = mid;
    }
  }

  return left;
}
