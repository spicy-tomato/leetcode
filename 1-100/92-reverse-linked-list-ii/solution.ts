import { ListNode, arrayToListNode } from '../../common/list-node';

function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
): ListNode | null {
  if (!head) return null;

  const getListNodeData = (): {
    reverse: ListNode[];
    beforeLeft: ListNode | null;
    afterRight: ListNode | null;
  } => {
    let idx = 1;
    let curr: ListNode = head;
    const reverse: ListNode[] = [];
    let beforeLeft: ListNode | null = null;
    let afterRight: ListNode | null = null;

    while (true) {
      if (idx >= left) {
        reverse.push(curr);
      } else if (idx + 1 === left) {
        beforeLeft = curr;
      }

      if (idx === right) {
        afterRight = curr.next;
        break;
      }

      if (!curr.next) break;
      idx++;
      curr = curr.next;
    }

    return { reverse, beforeLeft, afterRight };
  };

  const { reverse, beforeLeft, afterRight } = getListNodeData();
  // console.log(reverse, beforeLeft, afterRight);
  const n = reverse.length;

  if (beforeLeft) {
    beforeLeft.next = reverse[n - 1];
  }

  for (let i = n - 1; i > 0; i--) {
    reverse[i].next = reverse[i - 1];
  }

  reverse[0].next = afterRight;

  if (beforeLeft) {
    return head;
  }

  return reverse[n - 1];
}

const head = [3, 5],
  left = 1,
  right = 2;

const node = arrayToListNode(head);

let res = reverseBetween(node, left, right);

while (res) {
  console.log(res.val);
  if (res.next) {
    res = res.next;
  } else {
    break;
  }
}
