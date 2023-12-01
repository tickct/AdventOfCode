import { toDataFormatted, splitLine, splitAll } from '../../utils/fileRead.js'
import path from 'path'
import { chain, sum } from '../../utils/fp.js'
import _ from 'lodash'

const breakApartMove = instString => {
  const [dir, len] = instString.split(' ')
  return Array(Number(len)).fill(dir)
}

const dataStream = _.flattenDeep(toDataFormatted(
  path.join('.', '2022', 'Problem9', 'input.txt'),
  splitLine,
  lines => lines.map(breakApartMove)
))

const rope = {
  locH: [0,0],
  locT: [0,0],
  locs: ['0,0']
};

const stepLeft = ([x,y]) => [x-1,y]
const stepRight= ([x,y]) => [x+1,y]
const stepUp = ([x,y]) => [x,y+1]
const stepDown = ([x,y]) => [x,y-1]

const moveMap = {
  L: stepLeft,
  R: stepRight,
  U: stepUp,
  D: stepDown
}

const buildCommandX = (diffX, diffY) => {
  let commands = [];
  if(diffX > 1 || diffX === 1 && diffY !== 0){
    commands.push(stepRight)
  }
  if(diffX < -1 || diffX === -1 && diffY !== 0){
    commands.push(stepLeft)
  }
  return commands
}

const buildCommandY = (diffX, diffY) => {
  let commands = [];
  if(diffY > 1 || diffY === 1 && diffX !== 0){
    commands.push(stepUp)
  }
  if(diffY < -1 || diffY === -1 && diffX !== 0){
    commands.push(stepDown)
  }
  return commands
}

const moveTail = rope => {
  const diffX = rope.locH[0] - rope.locT[0]
  const diffY = rope.locH[1] - rope.locT[1]
  if(Math.abs(diffX) <= 1 && Math.abs(diffY) <= 1){
    return rope
  }
  const moveChain = [...buildCommandX(diffX,diffY),...buildCommandY(diffX,diffY)]
  const newCordT = chain(...moveChain)(rope.locT)
  return {...rope, locT: newCordT, locs: _.uniq([...rope.locs,newCordT.join(',')])}
}
const move = (dir, {locH, locT, locs}) => {
  const newCordH = moveMap[dir](locH);
  return moveTail({locH:newCordH, locT, locs})
}

const finish = dataStream.reduce((cords,dir) => {
  // console.log(cords.locH, cords.locT, cords.locs)
  return move(dir,cords)
},rope)

console.log(finish.locs.length)

const ropeArr = Array(9).fill(rope);

const longMove = (dir, ropeArr) => {
  const [head, ...restRope] = ropeArr;
  const moveHead = move(dir, head);
  return restRope.reduce(
    (headArr, node,i) => [...headArr, moveTail({...node, locH: headArr[i].locT})]
  , [moveHead]
  )
}

const finishLong = dataStream.reduce((cords,dir) => {
  return longMove(dir,cords)
},ropeArr)

console.log(finishLong.at(-1).locs.length)
