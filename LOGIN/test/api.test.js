const {dateBuilder} = require('../resources/databuilder')

const d = new Date('2002-12-23')

test('Data builder ', () => {
  expect(dateBuilder(d)).toBe('Monday 23 December 2002')
});



test('Data builder is defined ', () => {
  expect(dateBuilder(d)).toBeDefined()
});




