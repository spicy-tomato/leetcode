import { GetCompareValueFunction, Heap, MaxHeap } from '../heap';
import { PriorityQueue } from './priority-queue';

export class MaxPriorityQueue<T> extends PriorityQueue<T, MaxHeap<T>> {
  constructor(compare: GetCompareValueFunction<T>, heap?: Heap<T>) {
    super(compare, undefined, false);
    this._heap = new MaxHeap(compare, heap);
  }
}
