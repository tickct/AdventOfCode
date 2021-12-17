import {toDataFormatted, splitLine} from '../utils.js';
import path from 'path';

const dataArray= toDataFormatted(path.join('.','2021','Problem5','input.txt'),
   splitLine, 
   lines => lines.map(line => line.split('->').map(x => x.trim())),
   lines => lines.map(deltaStringArr => deltaStringArr.map(coordString => coordString.split(',').map(x => parseInt(x)))),
)

const dataArrayNoDiag = dataArray.map(lines => lines.filter(deltaStringArr => deltaStringArr[0][0] === deltaStringArr[1][0] || deltaStringArr[0][1] === deltaStringArr[1][1])
)

const toVentKey = point => point.join(',')

const incFrom = (ventDic, point, len, incrementor) => {
  ventDic[toVentKey(point)] = (ventDic[toVentKey(point)] || 0) + 1;
  if(len === 0) return ventDic;
  return incFrom(ventDic,incrementor(point),len-1,incrementor)
};

const filledDictionary = dataArray.reduce(
  (ventDic, [[x1,y1],[x2,y2]]) => {
    //sign returns 1 if positive, -1 if negative 0 if 0 so we can use it to determine slope
    return incFrom(ventDic, [x1,y1], Math.max(Math.abs(y1-y2), Math.abs(x1-x2)),  ([x,y]) => [x+Math.sign(x2-x1), y+Math.sign(y2-y1)])
  },{}
);

//console.log(filledDictionary)
console.log(Object.values(filledDictionary).filter(x => x > 1).length)