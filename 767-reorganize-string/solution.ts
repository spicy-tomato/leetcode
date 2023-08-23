function reorganizeString(s: string): string {
  const map: Record<string, number> = {};

  for (let str of s) {
    if (!map[str]) map[str] = 0;

    map[str] += 1;
  }

  const maxHeap = new MaxPriorityQueue();

  let result: string = '';

  for (let [key, value] of Object.entries(map)) {
    maxHeap.enqueue(key, value);
  }

  while (maxHeap.size() > 1) {
    const { element: firstChar, priority: firstOcc } = maxHeap.dequeue();
    const { element: secondChar, priority: secondOcc } = maxHeap.dequeue();

    result +=
      firstChar === result[result.length - 1]
        ? secondChar + firstChar
        : firstChar + secondChar;

    if (firstOcc > 1) maxHeap.enqueue(firstChar, firstOcc - 1);
    if (secondOcc > 1) maxHeap.enqueue(secondChar, secondOcc - 1);
  }

  if (maxHeap.size() > 0) {
    const { element: firstChar, priority: firstOcc } = maxHeap.dequeue();

    if (firstOcc > 1 || firstChar === result[result.length - 1]) return '';

    return result + firstChar;
  }

  return result;
}

const s = 'aab';

const res = reorganizeString(s);

console.log(res);
