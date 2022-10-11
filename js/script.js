let input
let inputArr
let wordCount
let prevValue = 0
let usedWords = {}

function doStuff() {
  input = document.querySelector('.essay-input').value.toLowerCase()
  inputArr = input.split(/ +/)
  wordCount = (input.match(/[\w\d]+/g) || []).length

  for (let i = 0; i < wordCount; i++) {
    prevValue = usedWords[`${inputArr[i]}`]
    usedWords[`${inputArr[i]}`] = 1
    if (prevValue) usedWords[`${inputArr[i]}`] = prevValue + 1
  }

  console.log(usedWords)
  for (const property in usedWords) {
    if (usedWords[property] === 1) delete usedWords[property]
  }

  const sortObject = obj => {
    const sorter = (b, a) => {
      return obj[a] - obj[b]
    }
    const keys = Object.keys(obj)
    keys.sort(sorter)
    const res = {}
    keys.forEach(key => {
      res[key] = obj[key]
    })
    return res
  }

  usedWords = sortObject(usedWords)

  let msg = ''

  for (const property in usedWords) {
    msg += `${property}: ${usedWords[property]}<br>`
  }

  document.querySelector('.total-sentence-count').innerHTML =
    'Total Sentence Count: ' + (input.match(/[\.\?\!]+ +/g) || []).length

  document.querySelector(
    '.total-word-count'
  ).innerHTML = `Total Word Count: ${wordCount}`
  document.querySelector('.words-list').innerHTML = msg
  input = wordCount = inputArr = null
  prevValue = 0
  usedWords = {}
}
