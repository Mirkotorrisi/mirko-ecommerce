import * as React from "react"

const defaultId = `skip-to-content`

export function SkipNavLink({
  children = `Skip to content`,
  contentId,
  ...props
}) {
  const id = contentId || defaultId

  return (
    <a className="" {...props} href={`#${id}`} data-skip-to-content>
      {children}
    </a>
  )
}

/**
 * Wrap the main content of a page with this, thus also the <main> tag
 */
export function SkipNavContent({ children, id: idProp, ...props }) {
  const id = idProp || defaultId

  return (
    <main {...props} id={id}>
      {children}
    </main>
  )
}
