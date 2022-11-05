import React, { useContext } from "react"
import { Link } from "gatsby"
import { Layout, LineItem } from "../components"
import { StoreContext } from "../context/store-context"
import { formatPrice } from "../utils/format-price"
import "./cart.scss"
import { Seo } from "../components/Seo"

export default function CartPage() {
  const { checkout, loading } = useContext(StoreContext)
  const emptyCart = checkout.lineItems.length === 0

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  return (
    <Layout>
      <div className="px-10 py-20">
        {emptyCart ? (
          <div className="empty">
            <h1 className="empty__title">Il tuo carrello è vuoto</h1>
            <p>Che aspetti??? Procurati il tuo enzino...</p>
            <Link to="/search?s=BEST_SELLING" className="empty__link">
              Guarda gli enzini di tendenza
            </Link>
          </div>
        ) : (
          <>
            <h1 className="title">Il tuo carrello</h1>
            <table className="cart__table w-full flex flex-col">
              <thead>
                <tr className="w-full flex justify-between p-5">
                  <th></th>
                  <th>Prodotto</th>
                  <th>Prezzo</th>
                  <th>Quantità</th>
                  <th>Totale</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="w-full pb-5">
                {checkout.lineItems.map((item) => (
                  <LineItem item={item} key={item.id} />
                ))}

                <tr className="w-full flex justify-between bottom-line">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Subtotale</td>
                  <td>
                    {formatPrice(
                      checkout.subtotalPriceV2.currencyCode,
                      checkout.subtotalPriceV2.amount
                    )}
                  </td>
                </tr>
                <tr className="w-full flex justify-between ">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Iva</td>
                  <td>
                    {formatPrice(
                      checkout.totalTaxV2.currencyCode,
                      checkout.totalTaxV2.amount
                    )}
                  </td>
                </tr>
                <tr className="w-full flex justify-between ">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Spedizione</td>
                  <td>Calcolata al checkout</td>
                </tr>
                <tr className="w-full flex justify-between ">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="flex items-center">Totale</td>
                  <td className="total">
                    {formatPrice(
                      checkout.totalPriceV2.currencyCode,
                      checkout.totalPriceV2.amount
                    )}
                  </td>
                </tr>
                <tr className="w-full flex justify-between ">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="total pt-5">
                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="checkout-button px-5 py-2"
                    >
                      Vai al Checkout
                    </button>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </Layout>
  )
}

export const Head = () => <Seo />
