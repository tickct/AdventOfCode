import {toDataFormatted, splitLine} from '../utils.js';
import path from 'path';


const dataArray= toDataFormatted(path.join('.','2021','Problem1','input.txt'), splitLine)
console.log(dataArray)
const toIncreaseCount = arr => {
  const search = arr.reduce(({count, last}, curr) => {
    return curr > last 
      ? { count: count+1, last: curr}
      : { count, last: curr}
  }, {count: 0, last: Number.MAX_VALUE});
  return search.count
}

const toSums = arr => arr
  .map((val, i, arr) =>  {
      return parseInt(val)+ parseInt(arr[i+1])+ parseInt(arr[i+2])
    })
  .slice(0,arr.length-2)

console.log(toIncreaseCount(toSums(dataArray)))