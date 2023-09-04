import { ListNode } from '../../common/list-node';

function hasCycle(head: ListNode | null): boolean {
  let s: ListNode | null = head;
  let f: ListNode | null = head?.next ?? null;

  while (f) {
    s = s?.next ?? null;
    f = f.next?.next ?? null;

    if (s && f && s === f) {
      return true;
    }
  }

  return false;
}
