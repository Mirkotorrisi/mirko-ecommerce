import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useLocation } from "@reach/router"

export function Seo({
  title = "",
  description = "",
  pathname = "",
  image = "",
  children = null,
}) {
  const location = useLocation()
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteTitleDefault
          siteUrl
          siteDescription
          siteImage
          twitter
        }
      }
    }
  `)

  const {
    siteTitle,
    siteTitleDefault,
    siteUrl,
    siteDescription,
    siteImage,
    twitter,
  } = siteMetadata

  const seo = {
    title: title || siteTitleDefault,
    description: description || siteDescription,
    url: pathname ? `${siteUrl}${pathname}` : location.href,
    image: `${siteUrl}${image || siteImage}`,
  }

  return (
    <>
      <title> {title ? `${title} | ${siteTitle}` : siteTitleDefault}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={twitter} />
      <link rel="icon" type="image/png" sizes="32x32" href="/faviconEzio.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/faviconEzio.png" />
      <link rel="faviconEzio" sizes="180x180" href="/faviconEzio.png" />
      {children}
    </>
  )
}