export const sum = (arr: (string|number)[]):number =>
  arr.reduce((count: number, next: string | number) => {
    return Number(next) + count
  }, 0)

export const chain =
  <T,>(...fns: Array<(x:T) => T>) =>
  (start: T) =>
    fns.reduce((val, fn) => fn(val), start)
