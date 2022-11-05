import React, { useContext } from "react"
import { Link } from "gatsby"
import { StoreContext } from "../../context/store-context"
import ezioFace from "../../../static/faviconEzio.png"
import { Navigation, CartButton, Toast } from ".."
import SearchIcon from "../../icons/search"
import "./index.scss"
export function Header() {
  const { checkout, loading, didJustAddToCart } = useContext(StoreContext)

  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <div className="">
      <header className="navbar flex fixed top-0 items-center justify-between flex-wrap w-full py-4 lg:py-0 px-10 ">
        <Link to="/" className="">
          <img src={ezioFace} alt="logo" />
        </Link>
        <Navigation className="" />
        <div class="flex gap-4">
          <Link to="/search" className="">
            <SearchIcon />
          </Link>
          <CartButton quantity={quantity} />
        </div>
      </header>
      <Toast show={loading || didJustAddToCart}>
        {!didJustAddToCart ? (
          "Updating…"
        ) : (
          <>
            Added to cart{" "}
            <svg
              width="14"
              height="14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.019 10.492l-2.322-3.17A.796.796 0 013.91 6.304L6.628 9.14a1.056 1.056 0 11-1.61 1.351z"
                fill="#fff"
              />
              <path
                d="M5.209 10.693a1.11 1.11 0 01-.105-1.6l5.394-5.88a.757.757 0 011.159.973l-4.855 6.332a1.11 1.11 0 01-1.593.175z"
                fill="#fff"
              />
              <path
                d="M5.331 7.806c.272.326.471.543.815.163.345-.38-.108.96-.108.96l-1.123-.363.416-.76z"
                fill="#fff"
              />
            </svg>
          </>
        )}
      </Toast>
    </div>
  )
}
