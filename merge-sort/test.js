const solution = require('./solution')

test('empty', () => {
  expect(solution([])).toStrictEqual([])
})

test('5 sorted', () => {
  expect(solution([1, 2, 3, 4, 5])).toStrictEqual([1, 2, 3, 4, 5])
})


test('5 random', () => {
  expect(solution([5, 2, 4, 3, 1])).toStrictEqual([1, 2, 3, 4, 5])
})

test('100 random', () => {
  let randomArray = [...generateRandomIterable(100, 100)];
  let sortedArray = randomArray.sort((a, b) => a - b);
  expect(solution(randomArray)).toBe(sortedArray)
})

test('1000 random', () => {
  let randomArray = [...generateRandomIterable(1000, 1000)];
  let sortedArray = randomArray.sort((a, b) => a - b);
  expect(solution(randomArray)).toBe(sortedArray)
})

test('10 000 random', () => {
  let randomArray = [...generateRandomIterable(10000, 10000)];
  let sortedArray = randomArray.sort((a, b) => a - b);
  expect(solution(randomArray)).toBe(sortedArray)
})

test('1 000 000 random', () => {
  let randomArray = [...generateRandomIterable(1000000, 1000000)];
  let sortedArray = randomArray.sort((a, b) => a - b);
  expect(solution(randomArray)).toBe(sortedArray)
})

function* generateRandomIterable(n, range) {
  for (let i = 0; i < n; i++) {
    yield ~~(Math.random() * range);
  }
}
