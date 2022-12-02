import { toDataFormatted, splitLine } from '../utils.js'
import path from 'path'

const toInstructions = (arr) =>
  arr.map((val) => {
    const [instruction, amount] = val.split(' ')
    return { instruction, amount: parseInt(amount) }
  })
const dataArray = toDataFormatted(
  path.join('.', '2021', 'Problem2', 'input.txt'),
  splitLine,
  toInstructions
)

//[hor, aim, vertical]
const instructionMap = {
  forward: (val) => (pos) => [pos[0] + val, pos[1], pos[2] + pos[1] * val],
  up: (val) => (pos) => [pos[0], pos[1] - val, pos[2]],
  down: (val) => (pos) => [pos[0], pos[1] + val, pos[2]],
}
const toMoveFunctions = (arr) => {
  return arr.map(({ instruction, amount }) =>
    instructionMap[instruction](amount)
  )
}

const finalCord = toMoveFunctions(dataArray).reduce(
  (pos, moveFn) => {
    return moveFn(pos)
  },
  [0, 0, 0]
)
console.log(finalCord[0] * finalCord[2])
