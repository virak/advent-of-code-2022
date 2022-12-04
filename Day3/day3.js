const fs = require('fs')

const alphaUppercase = Array.from(Array(26)).map((e, i) => i + 65);
const alphabetUppercase = alphaUppercase.map((x) => String.fromCharCode(x));
const alphaLowercase = Array.from(Array(26)).map((e, i) => i + 97);
const alphabetLowercase = alphaLowercase.map((x) => String.fromCharCode(x));

fs.readFile('./inputDay3.txt', 'utf8', (err, inputContent) => {
  if (err) {
    console.error(err)
    return
  }
  const racks = inputContent.split(/\r?\n/)

  handleAnswerPart1(racks)
  handleAnswerPart2(racks)
  
})

const handleAnswerPart2 = (racks) => {
  let totalPriority = 0
  let currentGroupRacks = []

  for(let i = 0; i < racks.length; i++) {
    const currentRack = racks[i]
    currentGroupRacks.push(currentRack)

    if ( currentGroupRacks.length === 3 ) {
      const letterFound = returnSameLetterInGroups(currentGroupRacks[0], currentGroupRacks[1], currentGroupRacks[2])
      const currentPriorityValue = findLetterPriorityValue(letterFound)
      totalPriority += currentPriorityValue
      currentGroupRacks = []
    }
  }

  console.log('>>>> totalPriority for asnwer 2: ', totalPriority)
}

const handleAnswerPart1 = (racks) => {
  let totalPriority = 0

  for(let i = 0; i < racks.length; i++) {
    const currentRack = racks[i]
    const middleIndex = Math.floor(currentRack.length / 2)
    const compartmentLeft = currentRack.substring(0, middleIndex)
    const compartmentRight = currentRack.substring(middleIndex)

    const commonLetter = returnSameLetterInString(compartmentLeft, compartmentRight)
    const currentLetterPriorityValue = findLetterPriorityValue(commonLetter)
    totalPriority += currentLetterPriorityValue
  }

  console.log('>>>> totalPriority answer 1: ', totalPriority)
}

const returnSameLetterInGroups = (group1, group2, group3) => {
  let returnLetter = ''
  let groupReference = ''
  let groupAlpha = ''
  let groupBeta = ''

  if ( group1.length >= group2.length && group1.length >= group3.length) {
    groupReference = group1
    groupAlpha = group2
    groupBeta = group3
  }
  if ( group2.length >= group1.length && group2.length >= group3.length) {
    groupReference = group2
    groupAlpha = group1
    groupBeta = group3
  }
  if ( group3.length >= group1.length && group3.length >= group2.length) {
    groupReference = group3
    groupAlpha = group1
    groupBeta = group2
  }

  for(let i = 0; i < groupReference.length; i++) {
    const currentLetter = groupReference[i]
    const letterFoundIngroup2 = groupAlpha.includes(currentLetter)
    const letterFoundIngroup3 = groupBeta.includes(currentLetter)
    if (letterFoundIngroup2 && letterFoundIngroup3) {
      returnLetter = currentLetter
      break
    }
  }

  return returnLetter
}

const returnSameLetterInString = (string1, string2) => {
  let returnLetter = ''
  for(let i = 0; i < string1.length; i++) {
    const currentLetter = string1[i]
    const letterFound = string2.includes(currentLetter)
    if (letterFound) {
      returnLetter = currentLetter
      break
    }
  }
  return returnLetter
}

const findLetterPriorityValue = (letter) => {
  let priorityValueToReturn = 0

  const indexInUppercase = alphabetUppercase.indexOf(letter)
  if (indexInUppercase === -1) {
    const indexInLowercase = alphabetLowercase.indexOf(letter)
    priorityValueToReturn = 1 + indexInLowercase 
  } else {
    priorityValueToReturn = 27 + indexInUppercase 
  }

  return priorityValueToReturn
}
