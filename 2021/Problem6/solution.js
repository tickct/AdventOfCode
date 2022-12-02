import { toDataFormatted, splitLine, splitComma } from '../utils.js'
import path from 'path'

const dataArray = toDataFormatted(
  path.join('.', '2021', 'Problem6', 'input.txt'),
  splitComma,
  (strValArr) => strValArr.map((strVal) => parseInt(strVal))
)

const cycleLife = (fishArr) =>
  fishArr.map((lifeCount) => (lifeCount === 0 ? 6 : lifeCount - 1))
const newChildren = (fishArr) => {
  const count = fishArr.filter((lifeCount) => lifeCount === 0).length
  return new Array(count).fill(8)
}

const cycle = (fishArr, n) => {
  if (n === 0) return fishArr
  const newFish = newChildren(fishArr)
  const agedFish = cycleLife(fishArr)
  return cycle([...agedFish, ...newFish], n - 1)
}

const bigLife = (fishObj) => {
  return Object.entries(fishObj).reduce((newAges, [lifeCount, count = 0]) => {
    const newAge = lifeCount === '0' ? 6 : parseInt(lifeCount) - 1
    return { ...newAges, [newAge]: (newAges[newAge] || 0) + count }
  }, {})
}

const bigNewfish = (fishObj) => {
  const count = fishObj[0]
  return { 8: count }
}

const bigCycle = (fishObj, n) => {
  if (n === 0) return fishObj
  const agedFish = bigLife(fishObj)
  return bigCycle({ ...agedFish, 8: fishObj[0] }, n - 1)
}

const toInitialFishDic = (fishArr) =>
  fishArr.reduce(
    (fishDic, age) => ({ ...fishDic, [age]: (fishDic[age] || 0) + 1 }),
    {}
  )
const countFish = (fishObj) =>
  Object.values(fishObj).reduce((count, next) => count + next, 0)

console.log(countFish(bigCycle(toInitialFishDic(dataArray), 256)))
