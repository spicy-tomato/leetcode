export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function arrayToListNode(arr: number[]) {
  const head = new ListNode(arr[0]);
  let node = head;

  for (let i = 1; i < arr.length; i++) {
    const newNode = new ListNode(arr[i]);
    node.next = newNode;
    node = newNode;
  }

  return head;
}
