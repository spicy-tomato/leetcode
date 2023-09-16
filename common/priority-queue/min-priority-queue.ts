import { GetCompareValueFunction, Heap, MinHeap } from '../heap';
import { PriorityQueue } from './priority-queue';

export class MinPriorityQueue<T> extends PriorityQueue<T, MinHeap<T>> {
  constructor(compare: GetCompareValueFunction<T>, heap?: Heap<T>) {
    super(compare, undefined, false);
    this._heap = new MinHeap(compare, heap);
  }
}
