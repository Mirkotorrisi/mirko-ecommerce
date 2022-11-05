import * as React from "react"
import { Link } from "gatsby"
import CartIcon from "../../icons/cart"
import "./index.scss"

export function CartButton({ quantity }) {
  return (
    <Link
      aria-label={`Shopping Cart with ${quantity} items`}
      to="/cart"
      className="relative"
    >
      <CartIcon />
      {quantity > 0 && <div className="badge">{quantity}</div>}
    </Link>
  )
}
