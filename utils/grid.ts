export type Cord = [row: number, col: number]

export const toGetRight =
  (table: string[][]) =>
  ([row, col]: Cord): string | undefined => {
    try {
      return table[row][col + 1]
    } catch {
      return undefined
    }
  }

export const toGetLeft =
  (table: string[][]) =>
  ([row, col]: Cord): string | undefined => {
    try {
      return table[row][col - 1]
    } catch {
      return undefined
    }
  }
export const toGetUp =
  (table: string[][]) =>
  ([row, col]: Cord): string | undefined => {
    try {
      return table[row - 1][col]
    } catch {
      return undefined
    }
  }
export const toGetDown =
  (table: string[][]) =>
  ([row, col]: Cord): string | undefined => {
    try {
      return table[row + 1][col]
    } catch {
      return undefined
    }
  }
export const toGetUpRight =
  (table: string[][]) =>
  ([row, col]: Cord): string | undefined => {
    try {
      return table[row - 1][col + 1]
    } catch {
      return undefined
    }
  }
export const toGetUpLeft =
  (table: string[][]) =>
  ([row, col]: Cord): string | undefined => {
    try {
      return table[row - 1][col - 1]
    } catch {
      return undefined
    }
  }
export const toGetDownRight =
  (table: string[][]) =>
  ([row, col]: Cord): string | undefined => {
    try {
      return table[row + 1][col + 1]
    } catch {
      return undefined
    }
  }
export const toGetDownLeft =
  (table: string[][]) =>
  ([row, col]: Cord): string | undefined => {
    try {
      return table[row + 1][col - 1]
    } catch {
      return undefined
    }
  }

export const toCheckRight =
  (table: string[][], pred: (val: string | undefined) => boolean) =>
  (cord: Cord) =>
    pred(toGetRight(table)(cord))
export const toCheckLeft =
  (table: string[][], pred: (val: string | undefined) => boolean) =>
  (cord: Cord) =>
    pred(toGetLeft(table)(cord))
export const toCheckUp =
  (table: string[][], pred: (val: string | undefined) => boolean) =>
  (cord: Cord) =>
    pred(toGetUp(table)(cord))
export const toCheckDown =
  (table: string[][], pred: (val: string | undefined) => boolean) =>
  (cord: Cord) =>
    pred(toGetDown(table)(cord))
export const toCheckUpLeft =
  (table: string[][], pred: (val: string | undefined) => boolean) =>
  (cord: Cord) =>
    pred(toGetUpLeft(table)(cord))
export const toCheckUpRight =
  (table: string[][], pred: (val: string | undefined) => boolean) =>
  (cord: Cord) =>
    pred(toGetUpRight(table)(cord))
export const toCheckDownLeft =
  (table: string[][], pred: (val: string | undefined) => boolean) =>
  (cord: Cord) =>
    pred(toGetDownLeft(table)(cord))
export const toCheckDownRight =
  (table: string[][], pred: (val: string | undefined) => boolean) =>
  (cord: Cord) =>
    pred(toGetDownRight(table)(cord))

/**
 *
 * @param table 2d array of string
 * @returns {(cord: Cord): string[]} a function that returns array of all neighbors
 */
export const toGetNeighbors =
  (table: string[][]) =>
  (cord: Cord): string[] =>
    [
      toGetRight(table)(cord),
      toGetLeft(table)(cord),
      toGetUp(table)(cord),
      toGetDown(table)(cord),
      toGetUpLeft(table)(cord),
      toGetUpRight(table)(cord),
      toGetDownLeft(table)(cord),
      toGetDownRight(table)(cord),
    ].filter((x): x is string => !!x)
