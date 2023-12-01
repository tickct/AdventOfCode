import { toDataFormatted, splitLine, splitAll } from '../../utils/fileRead.js'
import path from 'path'
import _ from 'lodash'
import { sum } from '../../utils/fp.js'

const dataStream = toDataFormatted(
  path.join('.', '2022', 'Problem13', 'input.txt'),
  (str) => str.split('\n\r'),
  (lines) => lines.map((line) => splitLine(line).filter((x) => x)),
  (lines) => lines.map((line) => line.map((val) => JSON.parse(val)))
)

const compare = (lArr, rArr) =>
  rArr.reduce((ans, right, i) => {
    if (ans) return ans
    if (!lArr || !lArr.length) return 'y'
    const left = lArr[i]
    if (left === undefined) return 'y'
    if (typeof left === 'number') {
      if (typeof right === 'number') {
        if (right === left) {
          if (right.length > i + 1) {
            return ans
          }
          return 'n'
        }
        return left < right ? 'y' : 'n'
      }
      if (!right.length) return 'n'
      return compare([left], right)
    }
    if (typeof right === 'number') {
      return compare(left, [right])
    }
    if (left.length && !right.length) {
      return 'n'
    }
    return compare(left, right)
  }, undefined)

const compare2 = (lArr = [], rArr = []) => {
  if (!lArr.length) return true
  if (lArr.length && !rArr.length) return false
  const [left, ...restLeft] = leftArr
  const [right, ...restRight] = rightArr
  if (typeof left === 'number') {
    if (typeof right === 'number') {
      if (right === left) return compare2(restLeft, restRight)
      return left < right ? true : false
    }
    if (!right.length) return 'n'
    return compare([left], right)
  }
  if (typeof right === 'number') {
    return compare(left, [right])
  }
  if (left.length && !right.length) {
    return 'n'
  }
  return compare(left, right)
}

const correct = dataStream.map((row) => compare(row[0], row[1]))

console.log(sum(correct.map((val, i) => (val === 'y' ? i + 1 : 0))))
