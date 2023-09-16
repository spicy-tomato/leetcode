export * from './heap';
export * from './min-heap';
export * from './max-heap';

export type GetCompareValueFunction<T> = (value: T) => number;
