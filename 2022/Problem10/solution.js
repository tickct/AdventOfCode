import { toDataFormatted, splitLine, splitAll } from '../../utils/fileRead.js'
import path from 'path'
import { sum } from '../../utils/fp.js'
import _ from 'lodash'

const dataStream = toDataFormatted(
  path.join('.', '2022', 'Problem10', 'input.txt'),
  splitLine
)

const vals = dataStream.reduce(
  (cycles, next) => {
    if (next === 'noop') return [...cycles, cycles.at(-1)]
    const [op, val] = next.split(' ')
    return [...cycles, cycles.at(-1), cycles.at(-1) + Number(val)]
  },
  [1]
)

const targets = [20, 60, 100, 140, 180, 220]

console.log(sum(targets.map((c) => c * vals[c - 1])))

const rows = _.chunk(vals, 40)

const visualLines = rows.map((row) =>
  row.map((pointer, i) => (Math.abs(pointer - i) <= 1 ? '#' : '.'))
)

visualLines.map((line) => console.log(line.join('')))
