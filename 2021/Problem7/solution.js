import {toDataFormatted, splitLine, splitComma} from '../utils.js';
import path from 'path';
import _ from 'lodash'
const dataArray= toDataFormatted(path.join('.','2021','Problem7','input.txt'),
  splitComma,
  strValArr => strValArr.map(strVal => parseInt(strVal)) 
)

const triangularNubmer = n => (n * (n + 1)) / 2;
const bruteForceCounts = arr => {
  const range = [...Array(_.max(arr)).keys()]
  return range.map(x => [x,
    arr.reduce((count, inner) => {
      return triangularNubmer(Math.abs(x-inner))+ count
    },0)]
  );
}

const findMin = bruteArr => {
  const sorted = bruteArr.reduce((best, next) => best[1] > next[1] ? next : best);
  return sorted
}
console.log(findMin(bruteForceCounts(dataArray)))