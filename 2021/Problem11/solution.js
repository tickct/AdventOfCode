import { toDataFormatted, splitLine, splitAll, sum } from '../utils.js'
import path from 'path'
import _ from 'lodash'
const dataArray = toDataFormatted(
  path.join('.', '2021', 'Problem11', 'input.txt'),
  splitLine,
  splitAll,
  (cord2D) =>
    cord2D.map((row) =>
      row.map((val) => ({ value: parseInt(val), visit: false }))
    )
)

const MAXROW = dataArray.length - 1
const MAXCOL = dataArray[0].length - 1

const isOutOfBounds = ([r, c]) => {
  return r > MAXROW || c > MAXCOL || r < 0 || c < 0
}

const getLeft = ([or, oc]) => [or, oc - 1]
const getRight = ([or, oc]) => [or, oc + 1]
const getUp = ([or, oc]) => [or - 1, oc]
const getDown = ([or, oc]) => [or + 1, oc]
const getUpLeft = ([or, oc]) => [or - 1, oc - 1]
const getUpRight = ([or, oc]) => [or - 1, oc + 1]
const getDownLeft = ([or, oc]) => [or + 1, oc - 1]
const getDownRight = ([or, oc]) => [or + 1, oc + 1]

const getNeighborCord = (cord) => ({
  left: getLeft(cord),
  right: getRight(cord),
  up: getUp(cord),
  down: getDown(cord),
  upRight: getUpRight(cord),
  upLeft: getUpLeft(cord),
  downRight: getDownRight(cord),
  downLeft: getDownLeft(cord),
})

const incrementNeightbors = (cord, cord2D) => {
  const neighborChords = getNeighborCord(cord)
  return Object.values(neighborChords)
    .filter((cord) => !isOutOfBounds(cord))
    .reduce((newCord, [nr, nc]) => {
      newCord[nr][nc].value = newCord[nr][nc].value + 1
      return newCord
    }, cord2D)
}

const flashChain = (cord2D, count = 0) => {
  const flashRowIndex = cord2D.findIndex((row) =>
    row.find(({ value, visit }) => value > 9 && !visit)
  )
  if (flashRowIndex === -1) return [cord2D, count]
  const flashColIndex = cord2D[flashRowIndex].findIndex(
    ({ value, visit }) => value > 9 && !visit
  )
  let newCord2D = incrementNeightbors([flashRowIndex, flashColIndex], cord2D)
  newCord2D[flashRowIndex][flashColIndex].visit = true
  return flashChain(newCord2D, count + 1)
}

const doNStep = (cord2D, n, count = 0) => {
  if (n === 0) return count
  const incCord2D = cord2D.map((row) =>
    row.map(({ value, visit }) => ({ value: value + 1, visit }))
  )
  const [flashCord2D, flashCount] = flashChain(incCord2D, 0)
  const resetCord = flashCord2D.map((row) =>
    row.map(({ value, visit }) => ({
      value: value > 9 ? 0 : value,
      visit: false,
    }))
  )
  return doNStep(resetCord, n - 1, count + flashCount)
}

const size = dataArray[0].length * dataArray.length
const findSync = (cord2D, n = 1) => {
  const incCord2D = cord2D.map((row) =>
    row.map(({ value, visit }) => ({ value: value + 1, visit }))
  )
  const [flashCord2D, flashCount] = flashChain(incCord2D, 0)
  const resetCord = flashCord2D.map((row) =>
    row.map(({ value, visit }) => ({
      value: value > 9 ? 0 : value,
      visit: false,
    }))
  )
  return flashCount === size ? n : findSync(resetCord, n + 1)
}

console.log(findSync(dataArray))
