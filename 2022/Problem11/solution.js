import { toDataFormatted, splitLine, splitAll } from '../../utils/fileRead.js'
import path from 'path'
import _ from 'lodash'

const dataStream = toDataFormatted(
  path.join('.', '2022', 'Problem11', 'input.txt'),
  str => str.split('\n\r'),
  lines => lines.map(line => splitLine(line).filter(x=>x))
)

const toMonkey = (startingItems, examineFn, testFn, mod) => {
  return {
    items: startingItems,
    examine: examineFn,
    test: testFn,
    mod: mod,
    inspected: 0
  }
}

const removeItem = (monkey) => ({
  ...monkey,
  items: monkey.items.slice(1)
})

const addItem = (monkey, item) => ({
  ...monkey,
  items: [...monkey.items, item]
})

const toOpMap = {
  '+': (x,y) => x+y,
  '*': (x,y) => x*y
}

const toOpVal = (str,x) => str === 'old' ? x : Number(str);

const toOp = opString => {
  const [full, left, op, right] = opString.match(/(old|\d+) ([\+\*]) (old|\d+)/)
  return (x) => toOpMap[op](toOpVal(left,x),toOpVal(right,x))
}

const toTest = (mod, trueIndex, falseIndex) => {
  return (x) => x % mod === 0 ? trueIndex : falseIndex
}

const toId = testStr => {
  const [trash, num] = testStr.split('monkey').map(x => x.trim())
  return Number(num)
}

const toMod = (testStr) => {
  const [trash , num] = testStr.split('by').map(x => x.trim())
  return Number(num)
}

const buildMonkey = infoArr => {
  const [monkeyId, startingItems, operation, test, idTrue, idFalse] = infoArr;
  const startItems = startingItems.split(':')[1].split(',').map(vals => Number(vals.trim()));
  const examineFn = toOp(operation);
  const mod = toMod(test)
  const testMod = toTest(mod, toId(idTrue), toId(idFalse))
  return toMonkey(startItems,examineFn, testMod, mod)
}

const monkeys = dataStream.map(instructions => buildMonkey(instructions))

const lcmNumber = monkeys.reduce((val, next) => val * next.mod,1)

const doCycle = (monkeyArr, lcmNumber) => monkeyArr.reduce((monkeyCurrArr, currMonkey, i) => {
  let newMonkeyArr = monkeyCurrArr;
  const items = monkeyCurrArr[i].items;
  items.forEach(num => {
    newMonkeyArr[i] = removeItem(newMonkeyArr[i])
    const examineWorry = monkeyCurrArr[i].examine(num)
    newMonkeyArr[i].inspected = newMonkeyArr[i].inspected+1
    const nextIndex = monkeyCurrArr[i].test(examineWorry)
    newMonkeyArr[nextIndex] = addItem(newMonkeyArr[nextIndex], examineWorry % lcmNumber)
  })
  return newMonkeyArr
},monkeyArr)

const cycleN = (n, curr) => {
  return Array(n).fill(' ').reduce((rCurr) => doCycle(rCurr, lcmNumber),curr)
}

const final = cycleN(10000, monkeys)

const finalCounts = final.map(moneky => moneky.inspected).sort((a,b) => b-a)
console.log(finalCounts[0]*finalCounts[1])