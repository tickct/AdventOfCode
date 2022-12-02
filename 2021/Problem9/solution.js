import { toDataFormatted, splitLine, splitAll, sum } from '../utils.js'
import path from 'path'
import _ from 'lodash'
const dataArray = toDataFormatted(
  path.join('.', '2021', 'Problem9', 'input.txt'),
  splitLine,
  splitAll
)

const MAXROW = dataArray.length - 1
const MAXCOL = dataArray[0].length - 1

const isOutOfBounds = ([r, c]) => {
  return r > MAXROW || c > MAXCOL || r < 0 || c < 0
}

const checkNeigbor =
  (moveFn) =>
  ([or, oc]) => {
    const [cr, cc] = moveFn([or, oc])
    if (isOutOfBounds([cr, cc])) {
      return true
    }
    return dataArray[cr][cc] > dataArray[or][oc]
  }

const checkLeft = checkNeigbor(([or, oc]) => [or, oc - 1])
const checkRight = checkNeigbor(([or, oc]) => [or, oc + 1])
const checkUp = checkNeigbor(([or, oc]) => [or - 1, oc])
const checkDown = checkNeigbor(([or, oc]) => [or + 1, oc])

const checkAll = (cord) => {
  return checkLeft(cord) && checkRight(cord) && checkUp(cord) && checkDown(cord)
}

const getRisk = (lowArr) =>
  sum(
    lowArr.map((row) =>
      row.reduce((count, val) => (val ? count + 1 + parseInt(val) : count), 0)
    )
  )

const getSize = (cordArr) => {
  cord
}
console.log(
  getRisk(
    dataArray.map((row, rowI) =>
      row.filter((col, colI) => checkAll([rowI, colI]))
    )
  )
)
