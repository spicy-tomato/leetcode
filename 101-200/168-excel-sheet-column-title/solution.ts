function convertToTitle(columnNumber: number): string {
  let res = '';
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  while (columnNumber > 0) {
    columnNumber--;
    res = alphabet[columnNumber % 26] + res;
    columnNumber = Math.floor(columnNumber / 26);
  }

  return res;
}

const columnNumber = 52;

const res = convertToTitle(columnNumber);

console.log(res);
