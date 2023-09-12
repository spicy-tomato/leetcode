function minDeletions(s: string): number {
  const findAndSwap = (arr: number[], idx: number): void => {
    let swapIdx = idx + 1;
    const n = arr.length;

    while (swapIdx < n && arr[idx] < arr[swapIdx]) {
      swapIdx++;
    }

    swapIdx--;

    const tmp = arr[idx];
    arr[idx] = arr[swapIdx];
    arr[swapIdx] = tmp;
  };

  const map = new Map<string, number>();
  let res = 0;

  for (const char of s) {
    map.set(char, (map.get(char) ?? 0) + 1);
  }

  const frequencies: number[] = [];

  for (const [_, frequency] of map) {
    frequencies.push(frequency);
  }

  frequencies.sort((a, b) => b - a);

  for (let i = 1; i < frequencies.length; ) {
    if (frequencies[i] === 0) {
      i++;
      continue;
    }

    if (frequencies[i] === frequencies[i - 1]) {
      frequencies[i]--;
      res++;
      findAndSwap(frequencies, i);
    } else {
      i++;
    }
  }

  return res;
}

const s =
  'abcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwz';

const res = minDeletions(s);

console.log(res);
