class LRUCache {
  capacity: number;
  map = new Map<number, number>();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: number): number {
    if (!this.map.has(key)) return -1;

    const value = this.map.get(key)!;
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  put(key: number, value: number): void {
    this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      this.map.delete(this.map.keys().next().value);
    }
  }
}

const actions = [
  'LRUCache',
  'put',
  'put',
  'get',
  'put',
  'get',
  'put',
  'get',
  'get',
  'get',
];
const params = [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]];

const lru = new LRUCache(params[0][0]);
for (let i = 1; i < actions.length; i++) {
  if (actions[i] === 'put') {
    lru.put(params[i][0], params[i][1]);
  } else {
    console.log(lru.get(params[i][0]));
  }
}
