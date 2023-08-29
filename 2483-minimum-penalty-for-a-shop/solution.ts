function bestClosingTime(customers: string): number {
  let currPenalty = 0;
  for (const char of customers) {
    if (char === 'Y') currPenalty++;
  }

  let minPenalty = currPenalty;
  let earliestHour = 0;

  for (let i = 0; i < customers.length; i++) {
    const char = customers[i];

    if (char === 'Y') {
      currPenalty--;
    } else {
      currPenalty++;
    }

    if (currPenalty < minPenalty) {
      earliestHour = i + 1;
      minPenalty = currPenalty;
    }
  }

  return earliestHour;
}

const customers = 'YYYY';

const res = bestClosingTime(customers);

console.log(res);
