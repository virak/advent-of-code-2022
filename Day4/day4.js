const fs = require('fs')

fs.readFile('./inputDay4.txt', 'utf8', (err, inputContent) => {
  if (err) {
    console.error(err)
    return
  }
  const sectionPairs = inputContent.split(/\r?\n/)
  let totalSectionOverlapsed = 0
  let totalAtLeastOneOverlap = 0

  for(let i = 0; i < sectionPairs.length; i++) {
    const currentSectionPair = sectionPairs[i]
    const splittedSectionPair = currentSectionPair.split(',')
    const leftSection = splittedSectionPair[0]
    const rightSection = splittedSectionPair[1]
    const splittedLeftSection = leftSection.split('-')
    const splittedRightSection = rightSection.split('-')
    const startLeftSection = parseInt(splittedLeftSection[0], 10)
    const endLeftSection = parseInt(splittedLeftSection[1], 10)
    const startRightSection = parseInt(splittedRightSection[0], 10)
    const endRightSection = parseInt(splittedRightSection[1], 10)

    if (hasFullyOverlapsedSection(startLeftSection, endLeftSection, startRightSection, endRightSection)) {
      totalSectionOverlapsed++
    }
    if (hasMinimumOneOverlap(startLeftSection, endLeftSection, startRightSection, endRightSection)) {
      totalAtLeastOneOverlap++
    }
  }

  console.log('>>>> total section overlapsed answer part 1: ', totalSectionOverlapsed)
  console.log('>>>> total section overlapsed answer part 2: ', totalAtLeastOneOverlap)
})

const hasMinimumOneOverlap = (startLeftSection, endLeftSection, startRightSection, endRightSection) => {
  let hasOverlapsed = false

  // -- check left section is in right
  if ((startLeftSection >= startRightSection && startLeftSection <= endRightSection) || (endLeftSection <= endRightSection && endLeftSection >= startRightSection)) {
    hasOverlapsed = true
  }

  // -- check right section is in right
  if ((startRightSection >= startLeftSection && startRightSection <= endLeftSection) || (endRightSection <= endLeftSection && endRightSection >= startLeftSection)) {
    hasOverlapsed = true
  }

  return hasOverlapsed
}

const hasFullyOverlapsedSection = (startLeftSection, endLeftSection, startRightSection, endRightSection) => {
  let hasOverlapsed = false

  // -- check left section is in right
  if (startLeftSection >= startRightSection && endLeftSection <= endRightSection) {
    hasOverlapsed = true
  }

  // -- check right section is in left
  if (startRightSection >= startLeftSection && endRightSection <= endLeftSection) {
    hasOverlapsed = true
  }

  return hasOverlapsed
}

