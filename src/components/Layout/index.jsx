import React from "react"
import { SkipNavContent, SkipNavLink } from "../SkipNav"
import { Header, Footer } from ".."

export function Layout({ children }) {
  return (
    <div>
      <Header />
      <SkipNavContent>{children}</SkipNavContent>
      <Footer />
    </div>
  )
}
