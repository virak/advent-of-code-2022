const fs = require('fs')

const craneStacks = [
  ['B', 'L', 'D', 'T', 'W', 'C', 'F', 'M'],
  ['N', 'B', 'L'],
  ['J','C', 'H', 'T', 'L', 'V'],
  ['S','P', 'J', 'W'],
  ['Z', 'S', 'C', 'F', 'T', 'L', 'R'],
  ['W', 'D', 'G', 'B', 'H', 'N', 'Z'],
  ['F', 'M', 'S', 'P', 'V', 'G', 'C', 'N'],
  ['W', 'Q', 'R', 'J', 'F', 'V', 'C', 'Z'],
  ['R', 'P', 'M', 'L', 'H']
]

// -- Main execution entry
fs.readFile('./inputDay5.txt', 'utf8', (err, inputContent) => {
  if (err) {
    console.error(err)
    return
  }
  const inputLines = inputContent.split(/\r?\n/)
  const partSolution = 2 // -- Change tis to display solution

  if (partSolution === 1) {
    handleSolutionPart1(inputLines)
  }
  if (partSolution === 2) {
    handleSolutionPart2(inputLines)
  }
})

const handleSolutionPart2 = (inputLines) => {
  for(let i = 10; i < inputLines.length; i++) {
    const currentMoveInstruction = inputLines[i]
    const currentFormattedMove = getMovingInstructionFormatted(currentMoveInstruction)
    applyMoveInstructionForNewModel(currentFormattedMove)
  }

  displayTopCraneStackElements(2)
}

const handleSolutionPart1 = (inputLines) => {
  for(let i = 10; i < inputLines.length; i++) {
    const currentMoveInstruction = inputLines[i]
    const currentFormattedMove = getMovingInstructionFormatted(currentMoveInstruction)
    applyMoveInstruction(currentFormattedMove)
  }

  displayTopCraneStackElements(1)
}

const displayTopCraneStackElements = (part) => {
  let tmpDisplay = ''
  for(let i = 0; i < craneStacks.length; i++) {
    tmpDisplay += craneStacks[i].pop()
  }
  console.log('>>>> solution part ' + part + ': ', tmpDisplay)
}

const applyMoveInstruction = (formattedMove) => {
  const indexToTakeAway = formattedMove[1]
  const indexToAddElement = formattedMove[2]
  const nbElementToMove = formattedMove[0]
  for(let i = 0; i < nbElementToMove; i++) {
    const tmpValue = craneStacks[indexToTakeAway].pop()
    craneStacks[indexToAddElement].push(tmpValue)
  }
}

const applyMoveInstructionForNewModel = (formattedMove) => {
  const indexToTakeAway = formattedMove[1]
  const indexToAddElement = formattedMove[2]
  const nbElementToMove = formattedMove[0]
  const tmpListStack = []
  for(let i = 0; i < nbElementToMove; i++) {
    const tmpValue = craneStacks[indexToTakeAway].pop()
    tmpListStack.unshift(tmpValue)
  }
  craneStacks[indexToAddElement] = craneStacks[indexToAddElement].concat(tmpListStack)
}

const getMovingInstructionFormatted = (singleInstruction) => {
  const splittedMove = singleInstruction.split(' ');
  return [
    parseInt(splittedMove[1], 10),
    parseInt(splittedMove[3], 10) - 1,
    parseInt(splittedMove[5], 10) - 1
  ]
}
