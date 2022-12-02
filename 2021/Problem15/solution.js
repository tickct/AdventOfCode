import { toDataFormatted, splitLine, splitAll, sum } from '../utils.js'
import path from 'path'
import _ from 'lodash'

const incPower = (y) => (x) => (x + y) % 9 === 0 ? 9 : (x + y) % 9

const toLargeBoard = (board) => {
  const longRows = board.map((row) => [
    ...row,
    ...row.map(incPower(1)),
    ...row.map(incPower(2)),
    ...row.map(incPower(3)),
    ...row.map(incPower(4)),
  ])
  return [
    ...longRows,
    ...longRows.map((row) => row.map(incPower(1))),
    ...longRows.map((row) => row.map(incPower(2))),
    ...longRows.map((row) => row.map(incPower(3))),
    ...longRows.map((row) => row.map(incPower(4))),
  ]
}

const dataArray = toDataFormatted(
  path.join('.', '2021', 'Problem15', 'Input.txt'),
  splitLine,
  splitAll,
  toLargeBoard,
  (rows) =>
    rows.map((row, r) =>
      row.map((val, c) => ({
        value: parseInt(val),
        visit: false,
        distance: r === 0 && c === 0 ? 0 : Number.MAX_SAFE_INTEGER,
      }))
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

const updateBoard = ([r, c], board) => {
  return [
    ...board.slice(0, r),
    board[r].map((node, i) =>
      i === c
        ? { value: node.value, visit: true, distance: node.distance }
        : node
    ),
    ...board.slice(r + 1),
  ]
}

const updateDistance = (cord, board) => {
  const currentNode = board[cord[0]][cord[1]]
  const neighborNodes = [getLeft, getRight, getUp, getDown]
    .map((fn) => fn(cord))
    .filter((x) => !isOutOfBounds(x))
  const newBoard = updateBoard(cord, board)
  return neighborNodes.reduce((upBoard, [r, c]) => {
    return [
      ...upBoard.slice(0, r),
      upBoard[r].map((node, i) =>
        i === c
          ? {
              value: node.value,
              visit: true,
              distance: Math.min(
                node.value + currentNode.distance,
                node.distance
              ),
            }
          : node
      ),
      ...upBoard.slice(r + 1),
    ]
  }, newBoard)
}

console.log(
  dataArray.reduce(
    (board, row, ri) =>
      row.reduce((board2, col, ci) => updateDistance([ri, ci], board2), board),
    dataArray
  )[MAXROW][MAXCOL]
)
