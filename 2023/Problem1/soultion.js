import { toDataFormatted, splitLine } from '../../utils/fileRead.js'
import path from 'path'
import { chain, sum } from '../../utils/fp.js'

const dataArray = toDataFormatted(
  path.join('.', '2023', 'Problem1', 'Input.txt'),
  splitLine
)

const transformOne = (arr) => arr.map((x) => x.replaceAll('one', 'o1ne'))
const transformTwo = (arr) => arr.map((x) => x.replaceAll('two', 't2wo'))
const transformThree = (arr) => arr.map((x) => x.replaceAll('three', 't3hree'))
const transformFour = (arr) => arr.map((x) => x.replaceAll('four', 'f4our'))
const transformFive = (arr) => arr.map((x) => x.replaceAll('five', 'f5ive'))
const transformSix = (arr) => arr.map((x) => x.replaceAll('six', 's6ix'))
const transformSeven = (arr) => arr.map((x) => x.replaceAll('seven', 's7even'))
const transformEight = (arr) => arr.map((x) => x.replaceAll('eight', 'e8ight'))
const transformNine = (arr) => arr.map((x) => x.replaceAll('nine', 'n9ine'))

const toNumFromString = chain(
  transformOne,
  transformTwo,
  transformThree,
  transformFour,
  transformFive,
  transformSix,
  transformSeven,
  transformEight,
  transformNine
)

const numbers = dataArray
  .map((row) => row.split('').filter((x) => Number.isInteger(Number(x))))
  .map((rowNum) => Number(`${rowNum[0]}${rowNum[rowNum.length - 1]}`))

console.log(sum(numbers))

const part2 = toNumFromString(dataArray)
  .map((row) => row.split('').filter((x) => Number.isInteger(Number(x))))
  .map((rowNum) => Number(`${rowNum[0]}${rowNum[rowNum.length - 1]}`))

console.log(sum(part2))
