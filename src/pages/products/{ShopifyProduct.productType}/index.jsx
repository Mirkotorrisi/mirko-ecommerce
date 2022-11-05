import * as React from "react"
import { graphql } from "gatsby"
import { Layout, ProductListing, Seo, MoreButton } from "../../../components"
import slugify from "@sindresorhus/slugify"
import "./index.scss"

export default function ProductTypeIndex({
  data: { products },
  pageContext: { productType },
}) {
  return (
    <Layout>
      <h1 className="title text-center mt-10">{productType}</h1>
      <ProductListing products={products.nodes} />
      {products.pageInfo.hasNextPage && (
        <MoreButton to={`/search?p=${slugify(productType)}#more`}>
          More Products
        </MoreButton>
      )}
    </Layout>
  )
}

export const Head = ({ pageContext: { productType } }) => (
  <Seo title={`Category: ${productType}`} />
)

export const query = graphql`
  query ($productType: String!) {
    products: allShopifyProduct(
      filter: { productType: { eq: $productType } }
      sort: { fields: publishedAt, order: ASC }
      limit: 24
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
