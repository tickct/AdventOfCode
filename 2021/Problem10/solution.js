import { toDataFormatted, splitLine, splitAll, sum } from '../utils.js'
import path from 'path'
import _ from 'lodash'
const dataArray = toDataFormatted(
  path.join('.', '2021', 'Problem10', 'input.txt'),
  splitLine,
  splitAll
)

const leftRightPair = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
}
const checkValidity = (bracketArr) => {
  return bracketArr.reduce(
    ({ queue, crash }, next) => {
      if (crash) {
        return { queue, crash }
      }
      if (Object.values(leftRightPair).includes(next)) {
        return { queue: [next, ...queue], crash }
      }
      if (leftRightPair[next] === queue[0])
        return { queue: queue.slice(1), crash }
      return { queue, crash: next }
    },
    { queue: [] }
  )
}

const crashPointsMap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const incompletePointsMap = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
}

const scoreIncomplete = (incArr) => {
  return incArr.reduce(
    (count, next) => count * 5 + incompletePointsMap[next],
    0
  )
}
console.log(
  sum(
    dataArray
      .map((row) => checkValidity(row))
      .filter((x) => x.crash)
      .map((x) => crashPointsMap[x.crash])
  )
)

const incompleteScoreArr = dataArray
  .map((row) => checkValidity(row))
  .filter((x) => !x.crash)
  .map((x) => scoreIncomplete(x.queue))
  .sort((a, b) => a - b)

console.log(incompleteScoreArr[Math.ceil((incompleteScoreArr.length - 1) / 2)])
