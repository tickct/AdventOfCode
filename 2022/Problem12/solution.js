import { toDataFormatted, splitLine, splitAll } from '../../utils/fileRead.js'
import path from 'path'
import { sum } from '../../utils/fp.js'
import _ from 'lodash'

const START_VAL = 96
const END_VAL = 123
const dataStream = toDataFormatted(
  path.join('.', '2022', 'Problem12', 'input.txt'),
  splitLine,
  (lines) =>
    lines.map((str) =>
      str.split('').map((x) => {
        if (x === 'S') {
          return START_VAL
        }
        if (x === 'E') {
          return END_VAL
        }
        return x.charCodeAt(0)
      })
    )
)

const nodeLeft = ([r, c]) => [r, c + 1]
const nodeRight = ([r, c]) => [r, c - 1]
const nodeUp = ([r, c]) => [r - 1, c]
const nodeDown = ([r, c]) => [r + 1, c]

const toGridValue = (grid, [r, c]) => grid?.[r]?.[c] || Number.POSITIVE_INFINITY

const canMoveMap = (grid, cord) => {
  const oneStepMax = (cord, checkFn) =>
    toGridValue(grid, cord) - toGridValue(grid, checkFn(cord)) >= -1
  const chordIf = (cord, checkFn) =>
    oneStepMax(cord, checkFn) ? checkFn(cord) : null
  return [
    chordIf(cord, nodeLeft),
    chordIf(cord, nodeRight),
    chordIf(cord, nodeUp),
    chordIf(cord, nodeDown),
  ].filter((x) => x)
}

const toNodes = (gridNum) =>
  gridNum.map((row, r) =>
    row.map((val, c) => ({
      visit: false,
      adjacent: canMoveMap(gridNum, [r, c]),
      val,
      cord: [r, c],
      distance: Number.MAX_SAFE_INTEGER,
    }))
  )

const searchMap = toNodes(dataStream)

const findChordVal = (searchMap, target) => {
  const r = searchMap.findIndex((nodeRow) =>
    nodeRow.find((node) => node.val === target)
  )
  const c = searchMap[r].findIndex((node) => node.val === target)
  return [r, c]
}

const updateBoard = ([r, c], board) => {
  return [
    ...board.slice(0, r),
    board[r].map((node, i) => (i === c ? { ...node, visit: true } : node)),
    ...board.slice(r + 1),
  ]
}

const updateDistance = (cord, board) => {
  const currentNode = board[cord[0]][cord[1]]
  const neighborNodes = currentNode.adjacent
  const newBoard = updateBoard(cord, board)
  return neighborNodes.reduce((upBoard, [r, c]) => {
    return [
      ...upBoard.slice(0, r),
      upBoard[r].map((node, i) =>
        i === c
          ? {
              ...node,
              distance: Math.min(1 + currentNode.distance, node.distance),
            }
          : node
      ),
      ...upBoard.slice(r + 1),
    ]
  }, newBoard)
}

const starts = dataStream.reduce(
  (starts, nextRow, r) => [
    ...starts,
    ...nextRow
      .map((cell, c) => (cell <= 97 ? [r, c] : undefined))
      .filter((x) => x),
  ],
  []
)

const findPaths = (grid, cord) => {
  let queue = [cord]
  let mutatedGrid = grid
  while (queue.length) {
    const [nextCord, ...rest] = queue
    const nextNode = mutatedGrid[nextCord[0]][nextCord[1]]
    mutatedGrid = updateDistance(nextCord, mutatedGrid)
    const toAddToQueue = nextNode.adjacent.filter(
      (cord) =>
        !toGridValue(mutatedGrid, cord).visit &&
        !queue.find((x) => x.join('') === cord.join(''))
    )
    queue = [...rest, ...toAddToQueue]
  }
  return mutatedGrid
}

const end = findChordVal(searchMap, END_VAL)

const others = starts
  .map((x) => {
    const map = toNodes(dataStream)
    map[x[0]][x[[1]]].distance = 0
    return toGridValue(findPaths(map, x), end)
  })
  .filter((x) => x.visit)
console.log(Math.min(others.map((x) => x.distance)))
