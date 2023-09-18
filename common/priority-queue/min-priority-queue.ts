import { GetCompareValueFunction, Heap, MinHeap } from '../heap';
import { PriorityQueue } from './priority-queue';

export class MinPriorityQueue<T> extends PriorityQueue<T, MinHeap<T>> {
  constructor({
    priority,
    heap,
  }: {
    priority: GetCompareValueFunction<T>;
    heap?: Heap<T>;
  }) {
    super(priority, undefined, false);
    this._heap = new MinHeap(priority, heap);
  }
}
