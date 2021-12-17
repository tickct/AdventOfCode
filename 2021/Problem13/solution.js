import {toDataFormatted, splitLine, splitAll, sum} from '../utils.js';
import path from 'path';
import _ from 'lodash';

const dataArray= toDataFormatted(path.join('.','2021','Problem13','Input.txt'),
  splitLine,
  
);

const foldREGEX =  /fold along (x|y)=(\d*)/
const points = dataArray.filter(row => row.includes(',')).map(x => x.split(','))
const instructions = dataArray.filter(row => row.includes('fold')).map(x => x.match(foldREGEX)).map(x => [x[1], parseInt(x[2])]) 
const toDimensions = points => points.reduce(([x,y], [x2, y2]) => [Math.max(x,x2),Math.max(y,y2)],[0,0])

const makeGrid = ([c,r]) => Array.from(new Array(r+1),x => Array(c+1).fill(''))

const fillGrid = (grid, points) => {
  return points.reduce((newGrid, [c, r]) => {
    newGrid[r][c] = 1;
    return newGrid
  }, grid)
};

const foldX = (grid, val) => {
  const halfNoMove = grid.map(row => row.slice(0, val))
  const halfMove = grid.map(row => row.slice(val+1).reverse())
  const combined = halfNoMove.map((row, i) => _.zip(row, halfMove[i]).map(([a,b]) => a || b || 0))
  return combined
}

const foldY = (grid, val) => {
  const halfNoMove = grid.slice(0,val)
  const halfMove = grid.slice(val+1).reverse()
  const combined = halfNoMove.map((row, i) => _.zip(row, halfMove[i]).map(([a,b]) => a || b || 0))
  return combined
}

const fold = (grid, instruction) => {
  const [direction, val] = instruction;
  if(direction === 'x'){
    return foldX(grid, val)
  }
  return foldY(grid, val)
}

const grid = (fillGrid(makeGrid(toDimensions(points)), points))

console.log(instructions.reduce((nextGrid, instruction) => fold(nextGrid, instruction),grid))