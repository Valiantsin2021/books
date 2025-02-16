import Money from './money'
import Portfolio from './portfolio'
import PortfolioPure from './portfolio-pure'

describe('Money', () => {
  test('testMultiplication', () => {
    const tenEuros = new Money(10, 'EUR')
    const twentyEuros = tenEuros.times(2)
    expect(tenEuros.times(2)).toEqual(twentyEuros)
  })

  test('testDivision', () => {
    const originalMoney = new Money(4002, 'KRW')
    const actualMoneyAfterDivision = originalMoney.divide(4)
    const expectedMoneyAfterDivision = new Money(1000.5, 'KRW')
    expect(actualMoneyAfterDivision).toEqual(expectedMoneyAfterDivision)
  })

  test('testAddition', () => {
    const fifteenDollars = new Money(15, 'USD')
    const fiveDollars = new Money(5, 'USD')
    const tenDollars = fiveDollars.times(2)

    const portfolio = new Portfolio()
    portfolio.add(fiveDollars, tenDollars)
    expect(portfolio.evaluate('USD')).toEqual(fifteenDollars)
  })

  test('testAdditionOfDollarsAndEuros', () => {
    const fiveDollars = new Money(5, 'USD')
    const tenEuros = new Money(10, 'EUR')
    const portfolio = new Portfolio()
    portfolio.add(fiveDollars, tenEuros) //?

    const expectedValue = new Money(17, 'USD')
    expect(portfolio.evaluate('USD')).toEqual(expectedValue)
  })

  test('testAdditionOfDollarsAndWons', () => {
    const oneDollar = new Money(1, 'USD')
    const elevenHundredWon = new Money(1100, 'KRW')
    const portfolio = new Portfolio()
    portfolio.add(oneDollar, elevenHundredWon)

    const expectedValue = new Money(2200, 'KRW')
    expect(portfolio.evaluate('KRW')).toEqual(expectedValue)
  })
})
