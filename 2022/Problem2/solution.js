import { toDataFormatted, splitLine } from '../../utils/fileRead.js'
import path from 'path'
import { sum } from '../../utils/fp.js'

const dataArray = toDataFormatted(
  path.join('.', '2022', 'Problem2', 'input.txt'),
  splitLine,
  (lines) => lines.map((line) => line.split(' '))
)

const resultMap = {
  A: {
    X: 3,
    Y: 6,
    Z: 0,
  },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
}

const codeMap = {
  X: {
    A: 'Z',
    B: 'X',
    C: 'Y',
  },
  Y: {
    A: 'X',
    B: 'Y',
    C: 'Z',
  },
  Z: {
    A: 'Y',
    B: 'Z',
    C: 'X',
  },
}

const mapRaw = {
  X: 1,
  Y: 2,
  Z: 3,
}

const calcVal = (o, y) => {
  return resultMap[o][y]
}

const toThrow = (o, y) => {
  return codeMap[y][o]
}

const scorePerRound = dataArray.map(
  ([o, y]) => calcVal(o, toThrow(o, y)) + mapRaw[toThrow(o, y)]
)

console.log(sum(scorePerRound))
