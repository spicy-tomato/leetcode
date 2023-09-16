import { GetCompareValueFunction } from '.';
import { Heap } from './heap';

const getMaxCompare =
  <T>(getCompareValue: GetCompareValueFunction<T>) =>
  (a: T, b: T) => {
    const aVal = typeof getCompareValue === 'function' ? getCompareValue(a) : a;
    const bVal = typeof getCompareValue === 'function' ? getCompareValue(b) : b;
    return aVal < bVal ? 1 : -1;
  };

export class MaxHeap<T> extends Heap<T> {
  constructor(getCompareValue: GetCompareValueFunction<T>, heap?: Heap<T>) {
    const comparer = getMaxCompare(getCompareValue);
    super(comparer, heap?.toArray(), heap?.leaf());
  }
}

exports.MaxHeap = MaxHeap;
