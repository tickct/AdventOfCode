import { toDataFormatted, splitLine } from '../utils.js'
import path from 'path'
import _ from 'lodash'

const dataArray = toDataFormatted(
  path.join('.', '2021', 'Problem4', 'input.txt')
)
const pulls = dataArray.split('\n')[0].split(',')

const boards = _.chunk(
  dataArray
    .split('\n')
    .slice(1)
    .map((v) => v.trim())
    .filter((x) => x),
  5
)

const boardArr = boards.map((board) =>
  board
    .map((rowStr) => rowStr.split(' ').filter((x) => x))
    .map((rowArr) =>
      rowArr.map((num) => ({ num: parseInt(num), marked: false }))
    )
)

const hasWinningRow = (board) =>
  board.some((rowArr) => {
    return rowArr.every((cell) => cell.marked)
  })
const hasWinningColumn = (board) =>
  board[0].some((cell, i) => board.every((row) => row[i].marked))

const markBoard = (markNum) => (board) => {
  return board.map((row) =>
    row.map(({ num, marked }) => ({
      num,
      marked: marked ? marked : num === parseInt(markNum),
    }))
  )
}
const cycleWin = ([nextNum, ...remainingNum], boardArr) => {
  const updatedBoardArr = boardArr.map(markBoard(nextNum))
  const winner =
    updatedBoardArr.find(hasWinningRow) ||
    updatedBoardArr.find(hasWinningColumn)
  if (winner) {
    return { board: winner, winNumber: nextNum }
  }
  return cycleWin(remainingNum, updatedBoardArr)
}

const sumUnmarked = (board) => {
  return board.reduce(
    (count, row) =>
      count +
      row.reduce(
        (countInner, { num, marked }) =>
          marked ? countInner : num + countInner,
        0
      ),
    0
  )
}

const cycleLoose = ([nextNum, ...remainingNum], boardArr) => {
  const updatedBoardArr = boardArr.map(markBoard(nextNum))
  const winnerRowIndex = updatedBoardArr.findIndex(hasWinningRow)
  const winnerColumnIndex = updatedBoardArr.findIndex(hasWinningColumn)
  if (winnerRowIndex !== -1 || winnerColumnIndex !== -1) {
    debugger
    if (boardArr.length === 1) {
      return { board: updatedBoardArr[0], winNumber: nextNum }
    }
    return cycleLoose(
      remainingNum,
      updatedBoardArr.filter(
        (board) => !hasWinningRow(board) && !hasWinningColumn(board)
      )
    )
  }
  return cycleLoose(remainingNum, updatedBoardArr)
}

const winningBaord = cycleWin(pulls, boardArr)
const loosingBoard = cycleLoose(pulls, boardArr)
console.log(sumUnmarked(winningBaord.board) * winningBaord.winNumber)

console.log(sumUnmarked(loosingBoard.board) * loosingBoard.winNumber)
