import React from "react"
import { SkipNavContent, SkipNavLink } from "../SkipNav"
import { Header, Footer } from ".."

export function Layout({ children }) {
  return (
    <div>
      <SkipNavLink />
      <Header />
      <SkipNavContent>{children}</SkipNavContent>
      <Footer />
    </div>
  )
}
