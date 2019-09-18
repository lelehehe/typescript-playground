import { isInternalLink } from './main'

test('should return false given external link', () => {
  expect(isInternalLink('https://google.com')).toBe(false)
})

test('should return true given internal link', () => {
  expect(isInternalLink('/some-page')).toBe(true)
})

const cases = [
  [ 'http://gmail.com', false ],
  [ '/some_page', true ],
  [ 'some_page', false ],
  [ '/some_page/another', true ],
  [ '/domain.gob.mm/another', true ],
  [ 'domain.gob.mm/another', false ],
  [ 'http://www.gmail.com', false ],
  [ 'www.gmail.com', false ],
  [ 'https://gmail.com', false ],
  [ 'http://gmail.com', false ]
]

describe("'isInternalLink' utility", () => {
  test.each(cases)(
    'given %p as argument, returns %p', (link, result) => {
      expect(
        isInternalLink(<string>link)
      ).toEqual(
        <boolean> result
      )
    }
  )
});