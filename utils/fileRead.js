import fs from 'fs'

const toData = (path) => {
  try {
    const data = fs.readFileSync(path, 'utf8')
    return data
  } catch {
    console.log('Err: unable to read ' + path)
  }
}

export const toDataFormatted = (localPath, ...formatFns) => {
  const data = toData(localPath)
  return formatFns.reduce((val, fn) => {
    return fn(val)
  }, data)
}

export const splitLine = (val) => val.split('\n').map((v) => v.trim())
export const splitComma = (val) => val.split(',').map((v) => v.trim())
export const splitAll = (arr) =>
  arr.map((x) =>
    x
      .split('')
      .map((v) => v.trim())
      .filter((x) => x)
  )
