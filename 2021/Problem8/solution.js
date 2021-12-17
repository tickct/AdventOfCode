import {toDataFormatted, splitLine, splitComma, sum, chain} from '../utils.js';
import path from 'path';
import _ from 'lodash'
const dataArray= toDataFormatted(path.join('.','2021','Problem8','input.txt'),
  splitLine,
  arr => arr.map(row => row.split('|').map(x => x.trim()))
)

const valid = [2,3,4,7, 8];

const fourDigit = dataArray.map(x => x[1].split(' '));
const keyArrs = dataArray.map(x => x[0].split(' '));
const countUnique = digArrs => {
  return digArrs.reduce((count, digArr) => {
    //console.log(digArr, digArr.filter(x => valid.some(y => y ===x.length)).length)
    return digArr.filter(x => valid.some(y => y ===x.length)).length + count
  },0)
};

//console.log(countUnique(fourDigit))

const numberLengths = {
  0: 6,
  1: 2,
  2: 5,
  3: 5,
  4: 4,
  5: 5,
  6: 6,
  7: 3,
  8: 7,
  9: 6
}

const initPossible = keyArr => {
  return Object.keys(numberLengths).reduce((possibleObj,number) => {
    return {
      ...possibleObj,
      [number]: keyArr.filter(key => {
        return key.length === numberLengths[number]
      }).map(x => x.split(''))
    };
  },{});
}

const solidify = possibleObj => {
  return Object.keys(possibleObj).reduce((solidObj,number) => {
    return {
      ...solidObj,
      [number]: possibleObj[number].length === 1 ? possibleObj[number][0] : possibleObj[number]
    }
  },{});
}
const containsAll = contain => key => {
  return contain.every(val => key.find(x => x === val));
}

const removeKnown = (keyOptions, key) => keyOptions.filter(option => _.difference(option,key).length !== 0);

const find0 = possibleObj => {
  return {
    ...possibleObj,
    0: possibleObj[0].find(x => !containsAll(_.difference(possibleObj[4],possibleObj[1]))(x)),
  }
}

const find6 = possibleObj => {
  const possible = removeKnown(possibleObj[6],possibleObj[0]);
  return {
    ...possibleObj,
    9: possible.find(containsAll(possibleObj[1])),
  }
}

const find9 = possibleObj => {
  return {
    ...possibleObj,
    6: removeKnown(removeKnown(possibleObj[6],possibleObj[0]),possibleObj[9])[0]
  }
}

const find3 = possibleObj => {
  return {
    ...possibleObj,
    3: possibleObj[3].find(containsAll(possibleObj[1]))
  }
}

const find5 = possibleObj => {
  return {
    ...possibleObj,
    5: possibleObj[5].find(x => x.every(y => possibleObj[6].find(z => z === y)))
  }
}

const find2 = possibleObj => {
  return {
    ...possibleObj,
    2: removeKnown(removeKnown(possibleObj[2],possibleObj[5]),possibleObj[3])[0]
  }
}

const finalize = possibleObj => {
  return Object.keys(possibleObj).reduce((solidObj,number) => {
    return {
      ...solidObj,
      [possibleObj[number].sort().join('')]: number
    }
  },{});
}


const toAnswerKey = keyArr => chain(
  initPossible,
  solidify,
  find0,
  find6,
  find9,
  find3,
  find5,
  find2,
  finalize
)(keyArr)

const solve = (fourDigitArr, key) => fourDigitArr.map(val => {
  const foo = key[val.split('').sort().join('')]
  return foo
})

//console.log(toAnswerKey(keyArrs[4]))
console.log(sum(fourDigit.map((fourD,i) => {
  const answerKey = toAnswerKey(keyArrs[i])
  return solve(fourD, answerKey).join('')
})))
