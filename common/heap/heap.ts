export type HeapComparer<T> = (a: T, b: T) => number;

export class Heap<T> implements Iterable<T> {
  private _compare: HeapComparer<T>;
  private _nodes: T[];
  private _leaf: T | null;

  constructor(compare: HeapComparer<T>, values?: Array<T>, leaf?: T | null) {
    if (typeof compare !== 'function') {
      throw new Error('Heap constructor expects a compare function');
    }
    this._compare = compare;
    this._nodes = Array.isArray(values) ? values : [];
    this._leaf = leaf || null;
  }

  toArray(): Array<T> {
    return Array.from(this._nodes);
  }

  insert(value: T): Heap<T> {
    this._nodes.push(value);
    this._heapifyUp(this.size() - 1);
    if (this._leaf === null || this._compare(value, this._leaf) > 0) {
      this._leaf = value;
    }
    return this;
  }

  push(value: T): Heap<T> {
    return this.insert(value);
  }

  extractRoot(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const root = this.root();
    this._nodes[0] = this._nodes[this.size() - 1];
    this._nodes.pop();
    this._heapifyDown(0);

    if (root === this._leaf) {
      this._leaf = this.root();
    }

    return root;
  }

  pop(): T | null {
    return this.extractRoot();
  }

  sort(): T[] {
    for (let i = this.size() - 1; i > 0; i -= 1) {
      this._swap(0, i);
      this._heapifyDownUntil(i);
    }
    return this._nodes;
  }

  fix(): Heap<T> {
    // fix node positions
    for (let i = Math.floor(this.size() / 2) - 1; i >= 0; i -= 1) {
      this._heapifyDown(i);
    }

    // fix leaf value
    for (let i = Math.floor(this.size() / 2); i < this.size(); i += 1) {
      const value = this._nodes[i];
      if (this._leaf === null || this._compare(value, this._leaf) > 0) {
        this._leaf = value;
      }
    }

    return this;
  }

  isValid(): boolean {
    const isValidRecursive = (parentIndex) => {
      let isValidLeft = true;
      let isValidRight = true;

      if (this._hasLeftChild(parentIndex)) {
        const leftChildIndex = parentIndex * 2 + 1;
        if (this._compareAt(parentIndex, leftChildIndex) > 0) {
          return false;
        }
        isValidLeft = isValidRecursive(leftChildIndex);
      }

      if (this._hasRightChild(parentIndex)) {
        const rightChildIndex = parentIndex * 2 + 2;
        if (this._compareAt(parentIndex, rightChildIndex) > 0) {
          return false;
        }
        isValidRight = isValidRecursive(rightChildIndex);
      }

      return isValidLeft && isValidRight;
    };

    return isValidRecursive(0);
  }

  clone(): Heap<T> {
    return new Heap(this._compare, this._nodes.slice(), this._leaf);
  }

  root(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    return this._nodes[0];
  }

  top(): T | null {
    return this.root();
  }

  leaf(): T | null {
    return this._leaf;
  }

  size(): number {
    return this._nodes.length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  clear(): void {
    this._nodes = [];
    this._leaf = null;
  }

  [Symbol.iterator](): Iterator<any> {
    let size = this.size();
    return {
      next: () => {
        size -= 1;
        return {
          value: this.pop(),
          done: size === -1,
        };
      },
    };
  }

  static heapify<T>(values: Array<T>, compare: HeapComparer<T>): Heap<T> {
    if (!Array.isArray(values)) {
      throw new Error('Heap.heapify expects an array of values');
    }

    if (typeof compare !== 'function') {
      throw new Error('Heap.heapify expects a compare function');
    }

    return new Heap(compare, values).fix();
  }

  static isHeapified<T>(values: Array<T>, compare: HeapComparer<T>): boolean {
    return new Heap(compare, values).isValid();
  }

  private _hasLeftChild(parentIndex: number): boolean {
    const leftChildIndex = parentIndex * 2 + 1;
    return leftChildIndex < this.size();
  }

  private _hasRightChild(parentIndex: number): boolean {
    const rightChildIndex = parentIndex * 2 + 2;
    return rightChildIndex < this.size();
  }

  private _compareAt(i: number, j: number): number {
    return this._compare(this._nodes[i], this._nodes[j]);
  }

  private _swap(i: number, j: number): void {
    const temp = this._nodes[i];
    this._nodes[i] = this._nodes[j];
    this._nodes[j] = temp;
  }

  private _shouldSwap(parentIndex: number, childIndex: number): boolean {
    if (parentIndex < 0 || parentIndex >= this.size()) {
      return false;
    }

    if (childIndex < 0 || childIndex >= this.size()) {
      return false;
    }

    return this._compareAt(parentIndex, childIndex) > 0;
  }

  private _compareChildrenOf(parentIndex: number): number {
    if (!this._hasLeftChild(parentIndex) && !this._hasRightChild(parentIndex)) {
      return -1;
    }

    const leftChildIndex = parentIndex * 2 + 1;
    const rightChildIndex = parentIndex * 2 + 2;

    if (!this._hasLeftChild(parentIndex)) {
      return rightChildIndex;
    }

    if (!this._hasRightChild(parentIndex)) {
      return leftChildIndex;
    }

    const compare = this._compareAt(leftChildIndex, rightChildIndex);
    return compare > 0 ? rightChildIndex : leftChildIndex;
  }

  private _compareChildrenBefore(
    index: number,
    leftChildIndex: number,
    rightChildIndex: number
  ): number {
    const compare = this._compareAt(rightChildIndex, leftChildIndex);

    if (compare <= 0 && rightChildIndex < index) {
      return rightChildIndex;
    }

    return leftChildIndex;
  }

  private _heapifyUp(startIndex: number): void {
    let childIndex = startIndex;
    let parentIndex = Math.floor((childIndex - 1) / 2);

    while (this._shouldSwap(parentIndex, childIndex)) {
      this._swap(parentIndex, childIndex);
      childIndex = parentIndex;
      parentIndex = Math.floor((childIndex - 1) / 2);
    }
  }

  private _heapifyDown(startIndex: number): void {
    let parentIndex = startIndex;
    let childIndex = this._compareChildrenOf(parentIndex);

    while (this._shouldSwap(parentIndex, childIndex)) {
      this._swap(parentIndex, childIndex);
      parentIndex = childIndex;
      childIndex = this._compareChildrenOf(parentIndex);
    }
  }

  private _heapifyDownUntil(index: number): void {
    let parentIndex = 0;
    let leftChildIndex = 1;
    let rightChildIndex = 2;
    let childIndex: number;

    while (leftChildIndex < index) {
      childIndex = this._compareChildrenBefore(
        index,
        leftChildIndex,
        rightChildIndex
      );

      if (this._shouldSwap(parentIndex, childIndex)) {
        this._swap(parentIndex, childIndex);
      }

      parentIndex = childIndex;
      leftChildIndex = parentIndex * 2 + 1;
      rightChildIndex = parentIndex * 2 + 2;
    }
  }
}
