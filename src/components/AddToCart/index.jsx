import React, { useContext } from "react"
import { StoreContext } from "../../context/store-context"
import "./index.scss"

export function AddToCart({ variantId, quantity, available, ...props }) {
  const { addVariantToCart, loading } = useContext(StoreContext)

  function addToCart(e) {
    e.preventDefault()
    addVariantToCart(variantId, quantity)
  }

  return (
    <button
      type="submit"
      className="checkout-button add-to-cart p-2"
      onClick={addToCart}
      disabled={!available || loading}
      {...props}
    >
      {available ? "Aggiungi al carrello" : "Non disponibile"}
    </button>
  )
}
