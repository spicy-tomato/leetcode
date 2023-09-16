import { Heap, HeapComparer } from '../heap';

export class PriorityQueue<T, H extends Heap<T>> {
  protected _heap: H;

  constructor(compare: HeapComparer<T>, values?: T[], initialHeap = true) {
    if (typeof compare !== 'function') {
      throw new Error('PriorityQueue constructor expects a compare function');
    }
    if (initialHeap) {
      this._heap = new Heap(compare, values) as H;
    }
    if (values) {
      this._heap.fix();
    }
  }

  front(): T | null {
    return this._heap.root();
  }

  back(): T | null {
    return this._heap.leaf();
  }

  enqueue(value: T): PriorityQueue<T, H> {
    this._heap.insert(value);
    return this;
  }

  push(value: T): PriorityQueue<T, H> {
    return this.enqueue(value);
  }

  dequeue(): T | null {
    return this._heap.extractRoot();
  }

  pop(): T | null {
    return this.dequeue();
  }

  remove(cb: (value: T) => boolean): Array<any> {
    if (typeof cb !== 'function') {
      throw new Error('PriorityQueue remove expects a callback');
    }

    const removed: T[] = [];
    const dequeued: T[] = [];

    while (!this.isEmpty()) {
      const popped = this.pop()!;
      if (cb(popped)) {
        removed.push(popped);
      } else {
        dequeued.push(popped);
      }
    }

    dequeued.forEach((val) => this.push(val));
    return removed;
  }

  size(): number {
    return this._heap.size();
  }

  isEmpty(): boolean {
    return this._heap.isEmpty();
  }

  clear(): void {
    this._heap.clear();
  }

  toArray(): T[] {
    return this._heap.clone().sort().reverse();
  }

  /**
   * Implements an iterable on the priority queue
   * @public
   */
  [Symbol.iterator]() {
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

  static fromArray<T, H extends Heap<T>>(
    values: T[],
    compare: HeapComparer<T>
  ): PriorityQueue<T, H> {
    return new PriorityQueue(compare, values);
  }
}
