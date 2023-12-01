export const sum = (arr) =>
  arr.reduce((count, next) => {
    return parseInt(next) + count
  }, 0)

  
export const chain =
  (...fns) =>
  (start) =>
    fns.reduce((val, fn) => fn(val), start)
