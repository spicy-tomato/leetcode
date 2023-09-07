function splitListToParts(
  head: ListNode | null,
  k: number
): Array<ListNode | null> {
  if (!head) {
    return new Array(k).fill(null);
  }

  if (k === 1) {
    return [head];
  }

  let nodes: ListNode[] = [];
  let curr = head;
  let result: (ListNode | null)[] = [];

  while (curr) {
    nodes.push(curr);
    curr = curr.next;
  }

  let n = nodes.length;
  let currIdx = 0;

  for (let i = 0; i < k; i++) {
    const currCount = Math.ceil(n / (k - i));
    result.push(nodes[currIdx] || null);
    if (nodes[currIdx - 1]) nodes[currIdx - 1].next = null;

    currIdx += currCount;
    n -= currCount;
  }

  return result;
}
