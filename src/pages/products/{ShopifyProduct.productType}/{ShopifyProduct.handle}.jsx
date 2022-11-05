import React, { useContext, useState, useCallback, useEffect } from "react"
import { graphql, Link } from "gatsby"
import { Layout, AddToCart, NumericInput, Seo } from "../../../components"
import isEqual from "lodash.isequal"
import { GatsbyImage, getSrc } from "gatsby-plugin-image"
import { StoreContext } from "../../../context/store-context"
import { formatPrice } from "../../../utils/format-price"
import { CgChevronRight as ChevronIcon } from "react-icons/cg"
import "./index.scss"

export default function Product({ data: { product, suggestions } }) {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRangeV2,
    title,
    description,
    images,
  } = product
  const { client } = useContext(StoreContext)

  const [variant, setVariant] = useState({ ...initialVariant })
  const [quantity, setQuantity] = useState(1)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant

  const [available, setAvailable] = useState(productVariant.availableForSale)

  const checkAvailablity = useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result =
          fetchedProduct?.variants.filter(
            (variant) => variant.id === productVariant.storefrontId
          ) ?? []

        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [productVariant.storefrontId, client.product]
  )

  const handleOptionChange = (index, event) => {
    const value = event.target.value

    if (value === "") {
      return
    }

    const currentOptions = [...variant.selectedOptions]

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    }

    const selectedVariant = variants.find((variant) => {
      return isEqual(currentOptions, variant.selectedOptions)
    })

    setVariant({ ...selectedVariant })
  }

  useEffect(() => {
    checkAvailablity(product.storefrontId)
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId])

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  )

  const hasVariants = variants.length > 1
  const hasImages = images.length > 0
  const hasMultipleImages = true || images.length > 1

  return (
    <Layout>
      <div className="p-20">
        <div className="grid grid-cols-2 gap-5">
          {hasImages && (
            <div className="product__image">
              <div className="hero__decoration mr-auto left"></div>
              <div className="hero__decoration2 mr-auto left"></div>
              <div className="hero__decoration3 mr-auto left"></div>
              <div
                role="group"
                aria-label="gallery"
                aria-describedby="instructions"
              >
                <ul className="flex overflow-x-auto max-h-96">
                  {images.map((image, index) => (
                    <li
                      key={`product-image-${image.id}`}
                      className="flex whitespace-nowrap "
                    >
                      <GatsbyImage
                        objectFit="contain"
                        loading={index === 0 ? "eager" : "lazy"}
                        alt={
                          image.altText
                            ? image.altText
                            : `Product Image of ${title} #${index + 1}`
                        }
                        image={image.gatsbyImageData}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              {hasMultipleImages && (
                <div
                  className="hidden mt-5 text-center absolute "
                  id="instructions"
                >
                  <span aria-hidden="true">←</span> scroll for more{" "}
                  <span aria-hidden="true">→</span>
                </div>
              )}
            </div>
          )}
          {!hasImages && (
            <span className="flex items-center justify-center">
              No Preview image
            </span>
          )}
          <div className="flex flex-col">
            <div className="product__breadcrumb flex items-center">
              <Link to={product.productTypeSlug}>{product.productType}</Link>
              <ChevronIcon size={12} />
            </div>
            <h1 className="product__name">{title}</h1>
            <p className="product__description">{description}</p>
            <h2 className="product__price">
              <span>{price}</span>
            </h2>
            <fieldset className="flex">
              {hasVariants &&
                options.map(({ id, name, values }, index) => (
                  <div className="flex" key={id}>
                    <select
                      aria-label="Variants"
                      onChange={(event) => handleOptionChange(index, event)}
                    >
                      <option value="">{`Select ${name}`}</option>
                      {values.map((value) => (
                        <option value={value} key={`${name}-${value}`}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
            </fieldset>
            <div className="flex gap-10 items-center">
              <NumericInput
                aria-label="Quantity"
                onIncrement={() => setQuantity((q) => Math.min(q + 1, 20))}
                onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                onChange={(event) => setQuantity(event.currentTarget.value)}
                value={quantity}
                min="1"
                max="20"
              />
              <AddToCart
                variantId={productVariant.storefrontId}
                quantity={quantity}
                available={available}
              />
            </div>
            <div className="grid product__meta mt-auto">
              <span className="px-2 ">Type</span>
              <div className="product__tags px-2">
                <Link to={product.productTypeSlug}>{product.productType}</Link>
              </div>
              <span className="px-2 ">Tags</span>
              <div className="product__tags px-2 flex gap-2">
                {product.tags.map((tag) => (
                  <Link to={`/search?t=${tag}`}>{tag}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Head = ({ data: { product } }) => {
  const {
    title,
    description,
    images: [firstImage],
  } = product

  return (
    <>
      {firstImage ? (
        <Seo
          title={title}
          description={description}
          image={getSrc(firstImage.gatsbyImageData)}
        />
      ) : undefined}
    </>
  )
}

export const query = graphql`
  query ($id: String!, $productType: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      title
      description
      productType
      productTypeSlug: gatsbyPath(
        filePath: "/products/{ShopifyProduct.productType}"
      )
      tags
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        # altText
        id
        gatsbyImageData(layout: CONSTRAINED, width: 640, aspectRatio: 1)
      }
      variants {
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
    suggestions: allShopifyProduct(
      limit: 3
      filter: { productType: { eq: $productType }, id: { ne: $id } }
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`
