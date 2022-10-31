require("dotenv").config()

module.exports = {
  siteMetadata: {
    siteTitle: "Mirko Ecommerce",
    siteTitleDefault: "Mirko Ecommerce",
    siteUrl: "https://mirkoecommerce.com",
    siteDescription:
      "Ezio Greggio, Enzo Iacchetti e tanti altri. Acquista ora le tue copie digitali di questi grandi personaggi!!",
    siteImage: "/ezio1.jpg",
    twitter: "@mirkoecommerce",
  },
  flags: {
    FAST_DEV: true,
  },
  plugins: [
    {
      resolve: "gatsby-source-shopify",
      options: {
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        password: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
        shopifyConnections: ["orders", "collections", "locations"],
        downloadImages: false,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-gatsby-cloud",
    // Add your Google Analytics ID to the .env file to enable
    // Otherwise, this plugin can be removed
    process.env.GOOGLE_ANALYTICS_ID && {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
  ].filter(Boolean),
}
