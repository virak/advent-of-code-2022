const fs = require('fs')

fs.readFile('./inputDay6.txt', 'utf8', (err, inputContent) => {
  getSolutionPart(inputContent, 1, 4)
  getSolutionPart(inputContent, 2, 14)
})

const getSolutionPart = (inputContent, part, gap) => {
  for(let i = 0; i < inputContent.length; i++) {
    const currentGroup = inputContent.substring(i, i + gap)
    const hasDuplicates = (/([a-zA-Z]).*?\1/).test(currentGroup)
    if (!hasDuplicates) {
      console.log('>>> solution part ' + part + ':', i + gap)
      break
    }
  }
}
