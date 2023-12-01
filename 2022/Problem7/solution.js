import { toDataFormatted, splitLine } from '../../utils/fileRead.js'
import path from 'path'
import _ from 'lodash'
import { sum } from '../../utils/fp.js'

const dataArray = toDataFormatted(
  path.join('.', '2022', 'Problem7', 'input.txt'),
  splitLine
)

const NAV_REGEX = /\$ cd (.+)/
const DIR_REGEX = /dir (.+)/
const FILE_REGEX = /(\d+) (.+)/
function Node(path, parent) {
  this.path = path
  this.files = []
  this.parent = parent
  this.levelSize = 0
  this.addFile = (file, size) => {
    this.files = [...this.files, { name: file, size }]
    this.levelSize = this.levelSize + Number(size)
  }
  this.addSubDir = (path) => (this[path] = new Node(path, this))
}

const combineLines = dataArray.reduce((commands, next) => {
  if (next[0] === '$') {
    return [...commands, [next]]
  }
  const currCommand = commands.pop()
  return [...commands, [...currCommand, next]]
}, [])

const run = (command, currNode) => {
  const [op, ...results] = command
  if (op.includes('cd')) {
    const match = op.match(NAV_REGEX)[1]
    if (match == '..') {
      return currNode.parent
    }
    return currNode[match]
  }
  results.forEach((val) => {
    if (val.includes('dir')) {
      const match = val.match(DIR_REGEX)[1]
      currNode.addSubDir(match)
    } else {
      const [, size, n] = val.match(FILE_REGEX)
      currNode.addFile(n, size)
    }
  })
  return currNode
}

const root = new Node('')
root.addSubDir('/')

combineLines.reduce((currNode, command) => {
  return run(command, currNode)
}, root)

const calcValues = (node) => {
  const children = _.difference(Object.keys(node), Object.keys(new Node()))
  if (children.length) {
    return sum([
      node.levelSize,
      ...children.map((key) => calcValues(node[key])),
    ])
  }
  return node.levelSize
}

const getAllLevels = (node) => {
  const children = _.difference(Object.keys(node), Object.keys(new Node()))
  if (children.length) {
    return [node, ...children.map((key) => getAllLevels(node[key]))]
  }
  return node
}

const sizes = _.flattenDeep(getAllLevels(root))
  .map(calcValues)
  .sort((a, b) => a - b)

const space = 70000000 - Math.max(...sizes)

console.log(sizes.filter((x) => x > 30000000 - space))
