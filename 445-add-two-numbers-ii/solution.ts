import { ListNode } from './list-node';

function parseToArray(node: ListNode) {
  const arr: number[] = [];

  while (true) {
    arr.unshift(node.val);
    if (node.next) {
      node = node.next;
    } else {
      break;
    }
  }
  return arr;
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  if (!l1) return l2;
  if (!l2) return l1;

  const arr1 = parseToArray(l1);
  const arr2 = parseToArray(l2);

  const minLen = Math.min(arr1.length, arr2.length);
  const maxLen = Math.max(arr1.length, arr2.length);
  let longer = arr1.length > arr2.length ? arr1 : arr2;
  let rem = 0;
  let head: ListNode | null = null;
  let node: ListNode | null = null;

  for (let i = 0; i < minLen; i++) {
    const sum = arr1[i] + arr2[i] + rem;
    const res = sum % 10;

    if (!head) {
      head = node = new ListNode(res);
    } else {
      const newNode: ListNode = new ListNode(res, node);
      node = newNode;
    }

    rem = Math.floor(sum / 10);
  }

  for (let i = minLen; i < maxLen; i++) {
    const sum = longer[i] + rem;
    const res = sum % 10;
    const newNode = new ListNode(res, node);
    node = newNode;
    rem = Math.floor(sum / 10);
  }

  if (rem) {
    const newNode = new ListNode(rem, node);
    node = newNode;
  }

  return node;
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

const l1 = [5];
const l2 = [5];

const res = addTwoNumbers(arrayToListNode(l1), arrayToListNode(l2));

console.log(res);
