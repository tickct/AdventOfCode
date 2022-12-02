import { toDataFormatted, splitLine, splitAll, sum } from '../utils.js'
import path from 'path'
import _ from 'lodash'

const toBinary = (hex) => parseInt(hex, 16).toString(2)

const dataArray = toDataFormatted(
  path.join('.', '2021', 'Problem16', 'exInput.txt'),
  toBinary
)

const sliceAt = (n) => (opString) => [opString.slice(0, n), opString.slice(n)]
const splitVersion = sliceAt(3)
const splitType = sliceAt(3)

const toLiteral = (opString) => {
  const [nextChunk, rest] = sliceAt(5)(opString)
  const [moreFlag, value] = sliceAt(1)(nextChunk)
  return moreFlag == 1 ? [value, ...toLiteral(rest)] : [value, rest]
}

const toOpType0 = (opString) => {
  const [subLength, subOp] = sliceAt(15)(opString)
  const length = parseInt(subLength, 2)
}

// const toOp = opString => {
//   const [lengthID, rest] = sliceAt(1)(opString);
//   const
// }
const commandObj = (opString) => {
  const [version, rest] = splitVersion(opString)
  const [type, rest2] = splitType(rest)
  const toTypeSorted =
    type.toString(2) === 4
      ? parseInt(toLiteral(rest2).join(''), 2)
      : toOp(rest2)
  return {
    version,
    type,
    value,
  }
}

console.log(commandObj(dataArray))
