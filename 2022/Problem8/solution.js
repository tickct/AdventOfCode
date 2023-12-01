import { toDataFormatted, splitLine, splitAll } from '../../utils/fileRead.js'
import path from 'path'
import { sum } from '../../utils/fp.js'
import _ from 'lodash'

const dataStream = toDataFormatted(
  path.join('.', '2022', 'Problem8', 'input.txt'),
  splitLine,
  lines => lines.map(str => str.split('').map(Number))
)

const isVisibleRight = arr => arr.reduce((vis, next, i) => {
  if(next <= Math.max(...arr.slice(0,i))) return [...vis, false]
  return [...vis, true]
},[])

const isVisibleLeft = arr => arr.reduce((vis, next, i) => {
  if(next <= Math.max(...arr.slice(i+1))) return [...vis, false]
  return [...vis, true]
},[])

const isVisableTop = twoArr => twoArr.map((arr, twoI) => 
  arr.reduce((vis, next, i) => {
    if(next <= Math.max(...twoArr.slice(0, twoI).map(arr => arr[i]))) return [...vis, false]
    return [...vis, true]
  },[])
)

const isVisableBottom = twoArr => twoArr.map((arr, twoI) => 
  arr.reduce((vis, next, i) => {
    if(next <= Math.max(...twoArr.slice(twoI+1).map(arr => arr[i]))) return [...vis, false]
    return [...vis, true]
  },[])
)

const visRight = dataStream.map(line => isVisibleRight(line))
const visLeft = dataStream.map(line => isVisibleLeft(line))
const visTop = isVisableTop(dataStream);
const visBottom = isVisableBottom(dataStream)

const toVis = (...visTwoArrs) => visTwoArrs[0].map((line,i) => _.zip(...visTwoArrs.map(arr => arr[i])))

const visible = toVis(visRight,visLeft, visTop, visBottom).map(line => line.map(val => val.some(x=>x)))

console.log(sum(visible.map(row => row.filter(x=>x).length)))

const toScoreRight = arr => arr.map((next, i) => {
  const treesLeftOrdered = arr.slice(0, i).reverse()
  const tallerTree = treesLeftOrdered.findIndex(tree => tree >= next)
  return tallerTree > -1 ? tallerTree+1 : treesLeftOrdered.length
})

const toScoreLeft = arr => arr.map((next, i) => {
  const treesLeftOrdered = arr.slice(i+1)
  const tallerTree = treesLeftOrdered.findIndex(tree => tree >= next)
  return tallerTree > -1 ? tallerTree+1 : treesLeftOrdered.length
})

const toScoreTop = twoArr => twoArr.map((arr, twoI) => 
  arr.map((next, i) => {
    const treesLeftOrdered = twoArr.slice(0,twoI).map(arr => arr[i]).reverse()
    const tallerTree = treesLeftOrdered.findIndex(tree => tree >= next)
    return tallerTree > -1 ? tallerTree+1 : treesLeftOrdered.length
  }
))

const toScoreBottom = twoArr => twoArr.map((arr, twoI) => 
  arr.map((next, i) => {
    const treesLeftOrdered = twoArr.slice(twoI+1).map(arr => arr[i])
    const tallerTree = treesLeftOrdered.findIndex(tree => tree >= next)
    return tallerTree > -1 ? tallerTree+1 : treesLeftOrdered.length
  }
))

const scoreRight = dataStream.map(line => toScoreRight(line))
const scoreLeft = dataStream.map(line => toScoreLeft(line))
const scoreTop = toScoreTop(dataStream)
const scoreBottom = toScoreBottom(dataStream)

const toScores = (...scoreTwoArrs) => scoreTwoArrs[0].map((line,i) => _.zip(...scoreTwoArrs.map(arr => arr[i])))
const scores = toScores(scoreRight,scoreLeft,scoreTop, scoreBottom).map(row => row.map(([a,b,c,d]) => a*b*c*d));
const scoresRaw = toScores(scoreRight,scoreLeft,scoreTop, scoreBottom)
const best = Math.max(...scores.map(x => Math.max(...x)));

const s = dataStream.map(line => toScoreRight(line))
