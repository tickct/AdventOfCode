import { toDataFormatted, splitLine } from '../../utils/fileRead.js'
import path from 'path'
import { sum } from '../../utils/fp.js'

const dataArray = toDataFormatted(
  path.join('.', '2022', 'Problem1', 'input.txt'),
  splitLine,
  (arr) =>
    arr.reduce(
      (sums, next) => {
        const [curr, ...rest] = sums
        return !next ? [[], ...sums] : [[...curr, next], ...rest]
      },
      [[]]
    )
)

const sums = dataArray.map((arr) => sum(arr))

console.log(sum(sums.sort((a, b) => b - a).slice(0, 3)))
