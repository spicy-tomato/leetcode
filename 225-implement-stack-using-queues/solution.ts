class MyStack {
  private stack: number[] = [];

  push(x: number): void {
    this.stack.push(x);
  }

  pop(): number {
    return this.stack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  empty(): boolean {
    return this.stack.length === 0;
  }
}
