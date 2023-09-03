function align(words: string[], width: number, lastLine = false): string {
  const n = words.length;

  let totalWordsLength = 0;
  for (const word of words) {
    totalWordsLength += word.length;
  }

  if (n === 1 || lastLine) {
    let result = words.join(' ');
    for (let i = 0; i < width - totalWordsLength - words.length + 1; i++) {
      result += ' ';
    }
    return result;
  }

  let totalSpace = width - totalWordsLength;
  if (totalSpace === n - 1) {
    return words.join(' ');
  }

  let spaceWidth = Math.ceil(totalSpace / (n - 1));
  let result = '';

  for (let i = 0; i < n - 1; i++) {
    result += words[i];
    for (let j = 0; j < spaceWidth; j++) {
      result += ' ';
    }
    totalSpace -= spaceWidth;
    spaceWidth = Math.ceil(totalSpace / (n - i - 2));
  }

  result += words[n - 1];

  return result;
}

function fullJustify(words: string[], maxWidth: number): string[] {
  const n = words.length;
  const lineList: string[][] = [[words[0]]];
  const result: string[] = [];
  let currLength = words[0].length;
  let currIdx = 0;

  for (let i = 1; i < n; i++) {
    const word = words[i];

    if (currLength + word.length + 1 <= maxWidth) {
      lineList[currIdx].push(word);
      currLength += word.length + 1;
      continue;
    }

    result.push(align(lineList[currIdx], maxWidth));
    currIdx++;
    lineList.push([word]);
    currLength = word.length;
  }

  if (lineList.length > result.length) {
    result.push(align(lineList[currIdx], maxWidth, true));
  }

  return result;
}

const words = [
    'Science',
    'is',
    'what',
    'we',
    'understand',
    'well',
    'enough',
    'to',
    'explain',
    'to',
    'a',
    'computer.',
    'Art',
    'is',
    'everything',
    'else',
    'we',
    'do',
  ],
  maxWidth = 20;

const res = fullJustify(words, maxWidth);

console.log(res);
