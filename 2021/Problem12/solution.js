import {toDataFormatted, splitLine, splitAll, sum} from '../utils.js';
import path from 'path';
import _ from 'lodash';

const dataArray= toDataFormatted(path.join('.','2021','Problem12','input.txt'),
  splitLine,
  lines => lines.map(line => line.split('-'))
);

const makeLinks = connections => {
  return connections.reduce((pathObj, [pathA, pathB]) => {
      return {
      ...pathObj,
      [pathA]: [...(pathObj[pathA] || []), pathB],
      [pathB]: [...(pathObj[pathB] || []), pathA]
    }
  }, {})
} 

const clearPaths = (location, pathObj) => Object.entries(pathObj)
  .reduce((pathObj,[key, value]) => ({
    ...pathObj,
    [key]: value.filter(x => x !== location)
  }),{});
  
const findPaths = (links, path) => {
  const currentNode = path[0]
  if(currentNode === 'end') return 1;
  const newLinks = currentNode === currentNode.toLowerCase()
    ? clearPaths(currentNode, links)
    : links
  const possibleNext = newLinks[currentNode]
  if(possibleNext.lenght === 0) return 0;
  return possibleNext.reduce((count, nextNode) => count+findPaths(newLinks, [nextNode,...path]),0)
} 

console.log(findPaths(makeLinks(dataArray), ['start']))

const findPaths2 = (links, path, hasUsedDouble) => {
  const currentNode = path[0]
  if(currentNode === 'end') return 1;
  const revisitedSmall = path.filter(p => p === currentNode.toLowerCase()).length >= 2;
  const clearedDupLinks = revisitedSmall && !hasUsedDouble
    ? path.filter(x => x === x.toLowerCase()).reduce((link,nextChar) => clearPaths(nextChar,link),links)
    : links
  const newLinks = ((revisitedSmall || hasUsedDouble) &&  currentNode !== currentNode.toUpperCase()) || ['start','end'].includes(currentNode)
    ? clearPaths(currentNode, clearedDupLinks)
    : clearedDupLinks
  const possibleNext = newLinks[currentNode];
  if(possibleNext.lenght === 0) return 0;
  return possibleNext.reduce((count, nextNode) => count+findPaths2(newLinks, [nextNode,...path], hasUsedDouble || revisitedSmall),0)
} 

console.log(findPaths2(makeLinks(dataArray), ['start']))