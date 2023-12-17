import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt");
// const input = 'djmdzpbfzsix1eightone5plbfrone'

const replacements = {
  'one': '1',
  'two': '2',
  'three': '3',
  "four": "4",
  "five": "5",
  "six": "6",
  "seven": "7",
  "eight": "8",
  "nine": "9",
}

const words = Object.keys(replacements)

const wordsContainsSubstr = (substr: string, dir: 'start' | 'end' = 'start') => {
  return !!words.find((w) => {
    if (dir === 'start')
      return w.startsWith(substr)
    return w.endsWith(substr)
  })
}

const findFirstNumber = (i: string) => {
  if (!isNaN(i[0] as unknown as number)) return i[0];

  let substr = i[0];
  let n = 1;
  while (wordsContainsSubstr(substr)) {
    if (words.indexOf(substr) !== -1) {
      return replacements[substr];
    }

    substr += i[n];
    n++;
  }

  substr = substr.slice(0, -1);
  // if (words.indexOf(substr) !== -1) {
  //   return replacements[substr];
  // }

  return findFirstNumber(i.slice(1))
}

const findLastNumber = (i: string) => {
  if (!isNaN(i[i.length - 1] as unknown as number)) return i[i.length - 1];

  let substr = i[i.length - 1];
  let n = 1;
  while (wordsContainsSubstr(substr, 'end') && substr.length <= i.length) {
    if (words.indexOf(substr) !== -1) {
      return replacements[substr];
    }
    substr = i[i.length - 1 - n] + substr;
    n++;
  }

  substr = substr.slice(1);

  return findLastNumber(i.slice(0, -1))
}

const result = input.toString()
  .split("\n")
  .map((s) => {
    // find first number
    let first = findFirstNumber(s);
    // console.log(first)
    let last = findLastNumber(s);

    console.log(first + last)
    return Number(first + last);
  })
  .reduce((a, n) => {
    return a + n;
  }, 0);

console.log(result);
