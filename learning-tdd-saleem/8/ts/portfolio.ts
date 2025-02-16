import Money from './money'

export default class Portfolio {
  moneys: Money[]
  constructor() {
    this.moneys = []
  }

  add(...moneys: Money[]): Money[] {
    return (this.moneys = this.moneys.concat(...moneys))
  }

  evaluate(currency: string): Money {
    const total = this.moneys.reduce(
      (sum, money) => sum + this.convert(money, currency),
      0
    )
    return new Money(total, currency)
  }

  convert(money, currency) {
    if (money.currency === currency) return money.amount

    return money.amount * 1.2
  }
}
