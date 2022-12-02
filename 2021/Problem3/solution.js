import { toDataFormatted, splitLine } from '../utils.js'
import path from 'path'

const dataArray = toDataFormatted(
  path.join('.', '2021', 'Problem3', 'input.txt'),
  splitLine,
  (valArr) => valArr.map((x) => x.split(''))
)
const toDecimal = (val) => parseInt(val, 2)
const getBitN = (n) => (bitStr) => {
  return bitStr[n]
}
const toBitArrayN = (n) => (bitStrArr) => bitStrArr.map(getBitN(n))
const toMostAndLeastCommonBit = (n) => (bitStrArr) => {
  const bitArrN = toBitArrayN(n)(bitStrArr)
  const ones = bitArrN.filter((x) => x === '1').length
  const zeros = bitArrN.filter((x) => x === '0').length
  return ones > zeros ? [1, 0] : [0, 1]
}

const valueRead = dataArray[0]
  .map((val, i, arr) => toMostAndLeastCommonBit(i)(dataArray))
  .reduce(
    ([mostCurr, leastCurr], next) => [mostCurr + next[0], leastCurr + next[1]],
    ['', '']
  )

const [gamma, epsilon] = valueRead.map(toDecimal)
console.log('part1:' + gamma * epsilon)

const toRating = (dataArr, compareFn, count = 0) => {
  if (dataArr.length === 1) return dataArr[0].join('')
  const bitArrN = toBitArrayN(count)(dataArr)
  debugger
  const ones = dataArr.filter((bitStr, i) => bitArrN[i] === '1')
  const zeros = dataArr.filter((bitStr, i) => bitArrN[i] === '0')
  return compareFn(ones.length, zeros.length)
    ? toRating(ones, compareFn, count + 1)
    : toRating(zeros, compareFn, count + 1)
}

const oxygenGeneratorRating = toDecimal(toRating(dataArray, (o, z) => o >= z))
const CO2GeneratorRating = toDecimal(toRating(dataArray, (o, z) => o < z))

console.log('part2:' + oxygenGeneratorRating * CO2GeneratorRating)
