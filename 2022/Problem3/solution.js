import { toDataFormatted, splitLine } from '../../utils/fileRead.js'
import path from 'path'
import { sum } from '../../utils/fp.js'
import _ from 'lodash'

const dataArray = toDataFormatted(
  path.join('.', '2022', 'Problem3', 'input.txt'),
  splitLine
)

const getPounches = (lines) =>
  lines.map((line) => _.chunk(line, line.length / 2))

const findPair = ([a, b]) => _.intersection(a, b)

const getNumber = (x) => x.charCodeAt(x)

const subToVal = (x) =>
  x === x.toUpperCase() ? getNumber(x) - 38 : getNumber(x) - 96

console.log(
  sum(getPounches(dataArray).map((pair) => subToVal(findPair(pair)[0])))
)

const getGroups = (dataArr) =>
  _.chunk(
    dataArr.map((data) => data.split('')),
    3
  )

const getBadge = (group) => _.intersection(...group)[0]

console.log(sum(getGroups(dataArray).map((group) => subToVal(getBadge(group)))))
