import * as React from "react"
import { Link } from "gatsby"
import CartIcon from "../../icons/cart"

export function CartButton({ quantity }) {
  return (
    <Link
      aria-label={`Shopping Cart with ${quantity} items`}
      to="/cart"
      className=""
    >
      <CartIcon />
      {quantity > 0 && <div className="">{quantity}</div>}
    </Link>
  )
}
