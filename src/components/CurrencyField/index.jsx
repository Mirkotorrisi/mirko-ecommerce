// @ts-check
import * as React from "react"

export function CurrencyField({ symbol, symbolAtEnd, className, ...props }) {
  return (
    <span>
      <span className="">{symbol}</span>
      <input type="numeric" className="" data-currency={symbol} {...props} />
    </span>
  )
}
