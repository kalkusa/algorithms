const solution = require('./solution')

test('empty', () => {
  expect(solution([])).toBe(0)
})

test('single', () => {
  expect(solution([2])).toBe(2)
})

test('two elements', () => {
  expect(solution([3, 2])).toBe(5)
})

test('5 sorted', () => {
  expect(solution([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6)
})