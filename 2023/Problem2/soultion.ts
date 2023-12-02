import { toDataFormatted, splitLine } from '../../utils/fileRead';
import path from 'path'
import { chain, sum } from '../../utils/fp';

const dataArray = toDataFormatted(
  path.join('.', '2023', 'Problem2', 'Input.txt'),
  splitLine
)

type CubeSet = {
  id: number
  blue: number,
  red: number,
  green: number
}

const toCubeSets = (line: string): CubeSet[] => {
  const [gameCount, games] = line.split(':');
  const rounds = games.split(';');
  return rounds.map((round:string): CubeSet => ({
    id: Number((gameCount.match(/Game (\d+)/) ?? [])[1]),
    blue: Number((round.match(/(\d+) blue/) ?? [])[1] ?? 0),
    red: Number((round.match(/(\d+) red/) ?? [])[1] ?? [] ?? 0),
    green: Number((round.match(/(\d+) green/) ?? [])[1] || 0)
  }))
}

const maxSizeBag = dataArray.map(toCubeSets).map(cubeSetArr => 
  cubeSetArr.reduce((highest: CubeSet, next) => ({
    id: next.id,
    red: Math.max(next.red, highest.red),
    blue: Math.max(next.blue, highest.blue),
    green: Math.max(next.green, highest.green)
  }), {id: 0, red: 0, blue: 0, green: 0})
)

const legalGames = maxSizeBag.filter(cubeSet => (
  cubeSet.red <= 12 &&
  cubeSet.blue <= 14 &&
  cubeSet.green <= 13
))


console.log("Part 1:",sum(legalGames.map(x => x.id)))

const powerArr = maxSizeBag.map(cubes => cubes.red * cubes.blue * cubes.green);

console.log("Part 2:", sum(powerArr))
