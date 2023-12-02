import fs from 'fs'

const toData = (path: string): string => {
  try {
    const data = fs.readFileSync(path, 'utf8')
    return data
  } catch {
    console.log('Err: unable to read ' + path)
    return ''
  }
}

export const toDataFormatted = (localPath: string, formatFn: (x: string) => string[]) => {
  const data = toData(localPath)
  return formatFn(data)
}

export const splitLine = (val:string): string[] => val.split('\n').map((v) => v.trim())
export const splitComma = (val:string): string[] => val.split(',').map((v) => v.trim())
export const splitAll = (arr: string[]): string[][] =>
  arr.map((x) =>
    x
      .split('')
      .map((v) => v.trim())
      .filter((x) => x)
  )
