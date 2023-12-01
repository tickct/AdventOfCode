import { toDataFormatted, splitLine } from '../../utils/fileRead.js'
import path from 'path'
import { sum } from '../../utils/fp.js'
import _ from 'lodash'

const instructionRe = /(\d+) from (\d+) to (\d+)/
const dataArray = toDataFormatted(
  path.join('.', '2022', 'Problem5', 'input.txt'),
  (inString) => inString.split('move')
)

const [stacks, ...instruction] = dataArray

const toCalcInstruction = (instruct) => {
  const [full, ...cords] = instruct.match(instructionRe)
  return cords.map(Number)
}

const calcInstruction = instruction.map(toCalcInstruction)

const toStacks = (stackStr) => {
  const arrs = stackStr.split('\n').map((line) => line.split(''))
  const lineups = arrs
    .map((line) => _.chunk(line, 4))
    .map((line) => line.map((val) => val[1]))
  const stacks = _.zip(...lineups.filter((val) => /[A-Z]/.test(val.join())))
  return stacks.map((stack) => stack.reverse().filter((x) => x.trim()))
}

const foo = toStacks(stacks)

const move = (instruction, stacks) => {
  const [number, from, to] = instruction
  const fromStack = stacks[from - 1]
  const toStack = stacks[to - 1]
  const float = fromStack.splice(fromStack.length - number, fromStack.length)
  return stacks.map((x, i) => {
    if (i === from - 1) {
      return fromStack
    }
    if (i === to - 1) {
      return [...toStack, ...float]
    }
    return x
  })
}

console.log(
  calcInstruction
    .reduce((currStack, instruction) => {
      return move(instruction, currStack)
    }, foo)
    .map((stack) => stack.pop())
    .join('')
)
