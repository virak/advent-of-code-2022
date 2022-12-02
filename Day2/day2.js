const fs = require('fs')

// A => Rock => points: 1
// B => Paper => points: 2
// C => Scissors => points: 3
// X => Rock => points: 1
// Y => Paper => points: 2
// Z => Scissors => points: 3

// 0 points for a loss
// 3 points for a draw
// 6 points for a win

// -------------- part 2
// X => Should lose
// Y => Should draw
// Z => Should win

fs.readFile('./inputDay2.txt', 'utf8', (err, inputContent) => {
  if (err) {
    console.error(err)
    return
  }
  const part = 2 // - hange this for the answer to display
  const splittedContent = inputContent.split(/\r?\n/)
  let myTotalPoints = 0

  for(let i = 0; i < splittedContent.length; i++) {
    const currentPair = splittedContent[i]
    const ennemyChoice = currentPair[0]
    let myChoice = currentPair[2]
    let myChoicePoints = 0

    // -- Check if I won
    let currentGamePoints = 0
    if (part === 1) {
      if (myChoice === 'X' && ennemyChoice === 'C') {
        currentGamePoints = 6
      }
      if (myChoice === 'Y' && ennemyChoice === 'A') {
        currentGamePoints = 6
      }
      if (myChoice === 'Z' && ennemyChoice === 'B') {
        currentGamePoints = 6
      }
      // -- Check if draw
      if (myChoice === 'X' && ennemyChoice === 'A') {
        currentGamePoints = 3
      }
      if (myChoice === 'Y' && ennemyChoice === 'B') {
        currentGamePoints = 3
      }
      if (myChoice === 'Z' && ennemyChoice === 'C') {
        currentGamePoints = 3
      }

      myChoicePoints = myChoice === 'X' ? 1 : myChoice === 'Y' ? 2 : 3
    }

    if (part === 2) {
      let myNewChoice = ''
      if (myChoice === 'X') {
        currentGamePoints = 0
        myNewChoice = ennemyChoice === 'A' ? 'Z' : ennemyChoice === 'B' ? 'X' : 'Y'
      }
      if (myChoice === 'Y') {
        currentGamePoints = 3
        myNewChoice = ennemyChoice === 'A' ? 'X' : ennemyChoice === 'B' ? 'Y' : 'Z'
      }
      if (myChoice === 'Z') {
        currentGamePoints = 6
        myNewChoice = ennemyChoice === 'A' ? 'Y' : ennemyChoice === 'B' ? 'Z' : 'X'
      }

      myChoicePoints = myNewChoice === 'X' ? 1 : myNewChoice === 'Y' ? 2 : 3
    }

    // -- Add up points
    myTotalPoints += currentGamePoints + myChoicePoints
  }

  console.log('>>>> myTotalPoints: ', myTotalPoints)
})
