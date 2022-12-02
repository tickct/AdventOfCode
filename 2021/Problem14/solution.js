import { toDataFormatted, splitLine, splitAll, sum } from '../utils.js'
import path from 'path'
import _ from 'lodash'

const dataArray = toDataFormatted(
  path.join('.', '2021', 'Problem14', 'Input.txt'),
  splitLine
)

const start = dataArray[0]

const instructions = dataArray
  .slice(1)
  .filter((x) => x)
  .reduce((instructionObj, next) => {
    const foo = next.split('->')
    return {
      ...instructionObj,
      [foo[0].trim()]: foo[1].trim(),
    }
  }, {})

const doCycle = (input, n) => {
  if (n === 0) return input
  const update = input
    .split('')
    .map((letter, i) => {
      if (input.length < i + 1) return letter
      const lookup = `${letter}${input[i + 1]}`
      const possibleAdd = instructions[lookup]
      return `${letter}${possibleAdd || ''}`
    })
    .join('')
  return doCycle(update, n - 1)
}

const counts = (input) => {
  const uniqe = _.uniq(input.split(''))
  const counts = uniqe.reduce(
    (counts, next) => [
      ...counts,
      input.split('').filter((x) => x === next).length,
    ],
    []
  )
  return counts
}

const diff = (counts) => _.max(counts) - _.min(counts)

console.log(diff(counts(doCycle(start, 10))))

const doCycleV2 = (countObj, n) => {
  if (n === 0) return countObj
  const update = Object.entries(countObj).reduce((countObj, [key, count]) => {
    const newLetter = instructions[key]
    const newKey1 = `${key[0]}${newLetter}`
    const newKey2 = `${newLetter}${key[1]}`
    if (!newLetter) {
      return countObj
    }
    const removedCountObj = {
      ...countObj,
      [key]: countObj[key] - count,
    }
    return {
      ...removedCountObj,
      [newKey1]: count + (removedCountObj[newKey1] || 0),
      [newKey2]: count + (removedCountObj[newKey2] || 0),
    }
  }, countObj)
  return doCycleV2(update, n - 1)
}

const toCountObj = (input) =>
  input.split('').reduce((countObj, next, i, arr) => {
    if (arr.length === i + 1) {
      return {
        ...countObj,
      }
    }
    return {
      ...countObj,
      [`${next}${arr[i + 1]}`]: 1 + (countObj[`${next}${arr[i + 1]}`] || 0),
    }
  }, {})

const toFirst = (start) => start[0]
const toLast = (start) => start[start.length - 1]

const countsV2 = (countObj, start) =>
  Object.values(
    Object.entries(countObj).reduce(
      (singleCounts, [pair, count]) => {
        return pair
          .split('')
          .reduce(
            (runningCount, next) => ({
              ...runningCount,
              [next]: (runningCount[next] || 0) + count,
            }),
            singleCounts
          )
      },
      {
        [toFirst(start)]: 1,
        [toLast(start)]: 1,
      }
    )
  ).map((x) => x / 2)

console.log(diff(countsV2(doCycleV2(toCountObj(start), 40), start)))
