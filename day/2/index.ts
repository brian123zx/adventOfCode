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

const powerSum = input.split('\n').map(game => {
  const parsed = parseGame(game);
  const gameMin = parsed.iterations.reduce((acc, i) => {
    for (let c in i) {
      if (!acc[c]) acc[c] = i[c];
      else acc[c] = Math.max(acc[c], i[c])
    }
    return acc;
  }, {});
  return (gameMin.red || 0) * (gameMin.green || 0) * (gameMin.blue || 0);
}).reduce((acc, g) => {
  return acc + g;
}, 0)

console.log(powerSum)