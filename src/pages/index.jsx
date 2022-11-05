import * as React from "react"
import { graphql } from "gatsby"
import { Layout, ProductListing, Seo } from "../components"
import herovideo from "../../static/herovideo.mp4"
import "./index.scss"

export const query = graphql`
  query {
    shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
      }
    }
  }
`
function Hero(props) {
  return (
    <div className="hero flex">
      <div className="hero__decoration ml-auto right-0"></div>
      <div className="hero__video__container ml-auto mt-24 mr-24">
        <video loop autoPlay muted className="hero__video ">
          <source src={herovideo} type="video/mp4" />
        </video>
      </div>
      <div className="hero__overlay flex pt-24 px-10 ">
        <h1 className="hero__title">Your Iacchetti, your style. </h1>
      </div>
      <div className="hero__decoration2 ml-auto right-0"></div>
    </div>
  )
}

export default function IndexPage({ data }) {
  return (
    <Layout>
      <Hero />
      <h2 className="title text-center mt-5 w-full">Scelti per te</h2>
      <ProductListing products={data?.shopifyCollection?.products} />
    </Layout>
  )
}

export const Head = () => <Seo />
