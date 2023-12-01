import { toDataFormatted, splitLine, splitAll } from '../../utils/fileRead.js'
import path from 'path'
import { sum } from '../../utils/fp.js'
import _ from 'lodash'

const dataStream = toDataFormatted(
  path.join('.', '2022', 'Problem6', 'input.txt'),
  (str) => str.split('')
)

const foo = dataStream.reduce((buffer, next, i) => {
  if (typeof buffer === 'number') return buffer
  if (buffer.length < 13) {
    return [...buffer, next]
  }
  if (_.uniq([...buffer, next]).length < 14) {
    return [...buffer.slice(1), next]
  }
  return i + 1
}, [])

console.log(foo)
