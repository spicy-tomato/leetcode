import { ListNode } from './list-node';

function partition(head: ListNode | null, x: number): ListNode | null {
  if (!head) return null;

  let curr: ListNode | null = head;
  let left: ListNode | null = null;
  let leftHead: ListNode | null = null;
  let right: ListNode | null = null;
  let rightHead: ListNode | null = null;

  while (curr) {
    if (curr.val < x) {
      if (!left) {
        left = new ListNode(curr.val);
        leftHead = left;
      } else {
        left.next = new ListNode(curr.val);
        left = left.next;
      }
    } else {
      if (!right) {
        right = new ListNode(curr.val);
        rightHead = right;
      } else {
        right.next = new ListNode(curr.val);
        right = right.next;
      }
    }

    curr = curr.next;
  }

  if (!left) return rightHead;
  if (!right) return leftHead;

  left.next = rightHead;
  return leftHead;
}
