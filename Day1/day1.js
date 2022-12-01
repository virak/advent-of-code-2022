const fs = require('fs')

let elfIndex = 0
let elfIndexWithMaxCalories = 0
let maxElfCalories = 0
let tmpElfCaloriesCalculation = 0
const maxCalorieByElfList = []

fs.readFile('./inputDay1.txt', 'utf8', (err, inputContent) => {
  if (err) {
    console.error(err)
    return
  }
  const splittedContent = inputContent.split(/\r?\n/)
  for (let i = 0; i < splittedContent.length; i++) {
    const currentCalory = splittedContent[i]
    const parsedCalory = parseInt(currentCalory, 10);
    if (isNaN(parsedCalory)) {
      
      // check if is the max value calorie
      if (tmpElfCaloriesCalculation > maxElfCalories) {
        elfIndexWithMaxCalories = elfIndex
        maxElfCalories = tmpElfCaloriesCalculation
      }
      maxCalorieByElfList.push(tmpElfCaloriesCalculation)
      // Reset for new calculation
      tmpElfCaloriesCalculation = 0
      elfIndex++
    } else {
      tmpElfCaloriesCalculation += parsedCalory
    }
  }

  console.log('>>> solution Part 1, elf index : ', elfIndexWithMaxCalories)
  console.log('>>> solution Part 1, elf max calory : ', maxElfCalories)

  maxCalorieByElfList.sort((a,b) => {
    return b - a
  })

  const totalMaxSolution2 = maxCalorieByElfList[0] + maxCalorieByElfList[1] + maxCalorieByElfList[2]
  console.log('>>> solution Part 2, total ', totalMaxSolution2)
})