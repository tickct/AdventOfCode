import { toDataFormatted, splitLine } from '../../utils/fileRead.js'
import path from 'path'
import { sum } from '../../utils/fp.js'
import _ from 'lodash'

const start = Date.now();

const dataArray = toDataFormatted(
  path.join('.', '2022', 'Problem4', 'input.txt'),
  splitLine,
  lines => lines.map(line => line.split(','))
)

const toRange = (rangeStr) => {
  const [lBound,hBound] = rangeStr.split('-');
  const diff = Number(hBound) - Number(lBound);
  return Array.from({length: diff+1}, (_, i) => i + Number(lBound))
}

const rangeArr = dataArray.map(line => line.map(toRange))

const isOverlap = (rangeA,rangeB) => {
  const interLen = _.intersection(rangeA,rangeB).length
  return interLen
}

const isOverlap2 = (ranges) => {
  const [[r1l,r1h],[r2l,r2h]] = ranges.map(r => r.split('-'))
  return 
}

console.log(rangeArr.filter(line => isOverlap(...line)).length)

console.log(`time: ${Date.now()-start} ms`)