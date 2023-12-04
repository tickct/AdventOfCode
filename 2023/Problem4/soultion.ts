import { splitLine, toDataFormatted } from '../../utils/fileRead'
import path from 'path'
import { sum } from '../../utils/fp'

const dataArray = toDataFormatted(
  path.join('.', '2023', 'Problem4', 'Input.txt'),
  splitLine
)

type card = {
  id: number
  winners: string[]
  entries: string[]
  extraTickets: number
}

const cards = dataArray.map((line, i) => {
  const [game, numbers] = line.split(':')
  const [winners, entries] = numbers.split('|')
  const winnersArr = winners.split(' ').filter((x) => x)
  const entriesArr = entries.split(' ').filter((x) => x)
  return {
    id: i,
    winners: winnersArr,
    entries: entriesArr,
    extraTickets: entriesArr.filter((e) => winnersArr.some((w) => w === e))
      .length,
  }
})

const winning = cards.map(({ winners, entries }) => {
  const score = entries.filter((e) => winners.some((w) => w === e))
  return score.length > 0 ? Math.pow(2, score.length - 1) : 0
})

console.log('Part 1:', sum(winning))

const toWinnerCount = () => {
  return cards.reverse().reduce((newCounts: card[], next) => {
    return [
      {
        ...next,
        extraTickets: sum([
          next.extraTickets,
          ...newCounts.slice(0, next.extraTickets).map((x) => x.extraTickets),
        ]),
      },
      ...newCounts,
    ]
  }, [])
}

console.log(
  'Part 2:',
  sum(toWinnerCount().map((x) => x.extraTickets)) + cards.length
)
