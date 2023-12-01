const MAX_VAL = 20
makeBets = (timestamp) => {
  let betVal = 0
  const [money, ...other] = [
    ...document.getElementsByClassName('user-header__info')[0].children,
  ]
  const moneyInt = parseInt(money.textContent)
  const slateNodes = [
    ...document.getElementById(timestamp).children[1].children,
  ]
  const betNodes = [...slateNodes[1].children]

  //pick a Team
  betNodes.forEach((node) => {
    const [, team1, team2] = node.children[0].children[0].children
    const [team1Odds, team1Radio] =
      team1.children[0].children[1].children[1].children
    const [team2Odds, team2Radio] =
      team2.children[0].children[1].children[1].children
    const voteOne =
      parseFloat(team1Odds.textContent) > parseFloat(team2Odds.textContent)
    if (betVal + MAX_VAL < moneyInt) {
      betVal += MAX_VAL
      voteOne ? team1Radio.click() : team2Radio.click()
      //need to give the dom a sec to render the bet buttons
      setTimeout(() => {
        const [x, min, half, max] =
          node?.children[0]?.children[1]?.children || []
        if (max) {
          max.click()
        }
      }, 100)
    }
  })
  const betButton = slateNodes[2].children[1]
  betButton.click()
}

makeBets('2023-01-09T19:00:00')
