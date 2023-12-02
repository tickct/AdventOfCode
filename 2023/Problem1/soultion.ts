import { toDataFormatted, splitLine } from '../../utils/fileRead';
import path from 'path'
import { chain, sum } from '../../utils/fp';

const dataArray = toDataFormatted(
  path.join('.', '2023', 'Problem1', 'Input.txt'),
  splitLine
)

const transformOne = (arr: string[]):string[] => arr.map((x) => x.replaceAll('one', 'o1ne'))
const transformTwo = (arr: string[]):string[] => arr.map((x) => x.replaceAll('two', 't2wo'))
const transformThree = (arr: string[]):string[] => arr.map((x) => x.replaceAll('three', 't3hree'))
const transformFour = (arr: string[]):string[] => arr.map((x) => x.replaceAll('four', 'f4our'))
const transformFive = (arr: string[]):string[] => arr.map((x) => x.replaceAll('five', 'f5ive'))
const transformSix = (arr: string[]):string[] => arr.map((x) => x.replaceAll('six', 's6ix'))
const transformSeven = (arr: string[]):string[] => arr.map((x) => x.replaceAll('seven', 's7even'))
const transformEight = (arr: string[]):string[] => arr.map((x) => x.replaceAll('eight', 'e8ight'))
const transformNine = (arr: string[]):string[] => arr.map((x) => x.replaceAll('nine', 'n9ine'))

const toNumFromString = chain<string[]>(
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
  .map((row: string): string[] => row.split('').filter((x) => Number.isInteger(Number(x))))
  .map((rowNum: string[]): number => Number(`${rowNum[0]}${rowNum[rowNum.length - 1]}`))

console.log(sum(numbers))

const part2 = toNumFromString(dataArray)
  .map((row: string) => row.split('').filter((x) => Number.isInteger(Number(x))))
  .map((rowNum: string[]) => Number(`${rowNum[0]}${rowNum[rowNum.length - 1]}`))

console.log(sum(part2))
