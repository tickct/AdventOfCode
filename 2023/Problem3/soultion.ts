import { toDataFormatted, splitLine } from '../../utils/fileRead'
import path from 'path';
import { chain, sum } from '../../utils/fp';
import { Cord, toCheckDown, toCheckDownLeft, toCheckDownRight, toCheckLeft, toCheckRight, toCheckUp, toCheckUpLeft, toCheckUpRight, toGetNeighbors } from '../../utils/grid';

const dataArray = toDataFormatted(
  path.join('.', '2023', 'Problem3', 'Input.txt'),
  splitLine
)

const isSymbol = (val?: string): boolean => val ? /[^\d\.]/.test(val) : false;
const isNumberString = (val?: string): boolean => val ? /\d/.test(val) : false;

const items = dataArray.map(row => row.split(''))

const fullNums = items.map((row,r) => {
  const numberLocations = [...Array.from(row.join('').matchAll(/\d+/g))]
  return numberLocations.reduce((newRow, next) => {
    const val = next[0]
    const { index } = next;
    if(index === undefined) return newRow;
    return newRow.fill(val, index, index+val.length)
  }, row)
})

const isPartNumber = (cord: Cord) => [
  toCheckRight(items, isSymbol),
  toCheckDown(items, isSymbol),
  toCheckLeft(items, isSymbol),
  toCheckUp(items, isSymbol),
  toCheckDownLeft(items, isSymbol),
  toCheckDownRight(items, isSymbol),
  toCheckUpLeft(items, isSymbol),
  toCheckUpRight(items, isSymbol),
].some(pred => pred(cord))

const partNumbers = fullNums.map((row,r) => {
  const partNumbers = row.map((val,c) => isPartNumber([r,c]) && /\d/.test(val) ? val : undefined)
  return partNumbers.filter((x,i): x is string => {
    return !!x && partNumbers[i+1] !== x
  }).sort()
}).flat()

console.log("Part 1:",sum(partNumbers))


const nextToNumber = (cord: Cord) => [
  toCheckRight(items, isNumberString),
  toCheckDown(items, isNumberString),
  toCheckLeft(items, isNumberString),
  toCheckUp(items, isNumberString),
  toCheckDownLeft(items, isNumberString),
  toCheckDownRight(items, isNumberString),
  toCheckUpLeft(items, isNumberString),
  toCheckUpRight(items, isNumberString),
].map(pred => pred(cord)).length >= 2

const gears = items.map((row,r) => {
  return row.map((item, c) => {
    if(/\*/.test(item) && nextToNumber([r, c])) {
      return [...new Set(toGetNeighbors(fullNums)([r,c]).filter(isNumberString))]
    }
    return undefined
  })
  .filter((x): x is string[] => !!(x && x.length === 2)).map(([a,b]) => Number(a)*Number(b))
}).flat()


console.log("Part 2:",sum(gears))
