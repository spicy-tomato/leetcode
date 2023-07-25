function peakIndexInMountainArray(arr: number[]): number {
  const peek = (arr: number[], start: number, end: number): number => {
    if (start === end) return start;
    if (end - 1 === start) return arr[start] > arr[end] ? start : end;

    const mid = start + Math.ceil((end - start) / 2);
    if (arr[mid - 1] < arr[mid] && arr[mid] > arr[mid + 1]) return mid;

    if (arr[mid - 1] < arr[mid] && arr[mid] < arr[mid + 1])
      return peek(arr, mid + 1, end);

    return peek(arr, start, mid - 1);
  };

  return peek(arr, 0, arr.length - 1);
}

const arr = [0,10,5,2]

const res = peakIndexInMountainArray(arr);

console.log(res);
