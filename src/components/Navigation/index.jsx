import { graphql, useStaticQuery, Link } from "gatsby"
import * as React from "react"
import slugify from "@sindresorhus/slugify"

export function Navigation({ className }) {
  const {
    allShopifyProduct: { productTypes },
  } = useStaticQuery(graphql`
    query {
      allShopifyProduct {
        productTypes: distinct(field: productType)
      }
    }
  `)

  return (
    <nav className="">
      <Link key="All" className="" to="/products/" activeClassName="">
        All products
      </Link>
      {productTypes.map((name) => (
        <Link
          key={name}
          className=""
          to={`/products/${slugify(name)}`}
          activeClassName=""
        >
          {name}
        </Link>
      ))}
    </nav>
  )
}
