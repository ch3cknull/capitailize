const { capitalize } = require('../src/replace')
const fs = require('fs')

test('capitalize', () => {
  const read = (fileName) => fs.readFileSync(fileName).toString()

  const rawText = read('test/data/raw.txt')
  const targetText = read('test/data/target.txt')

  expect(capitalize(rawText)).toBe(targetText)
})
