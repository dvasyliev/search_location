import currencyFormatter from 'currency-formatter'

const toUSD = (value) => {
  return currencyFormatter.format(value, {
    code: 'USD',
    precision: 0
  })
}

export {
  toUSD
}
