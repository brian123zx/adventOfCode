import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt").toString();

const limit = {
  red: 12,
  green: 13,
  blue: 14,
};

const parseGame = (gameStr: string) => {
  const gameId = Number(gameStr.split(':')[0].split(' ')[1]);
  const iterations = gameStr.split(': ')[1].split('; ').map((iteration) => {
    return iteration.split(', ').map((c) => {
      const [num, color] = c.split(' ');
      return {
        [color]: Number(num)
      }
    }).reduce((acc, c) => {
      return {
        ...acc,
        ...c
      }
    }, {});
  });


  return {
    id: gameId,
    iterations
  };
};


const sum = input.split('\n').map(game => {
  const parsed = parseGame(game);
  console.log(parsed)

  // check game
  const invalid = parsed.iterations.find(i => {
    for (let c in i) {
      if (limit[c] < i[c]) return true;
    }
    return false;
  });
  if (invalid) return 0;
  return parsed.id;
}).reduce((acc, g) => {
  return acc + g
}, 0)

console.log(sum)