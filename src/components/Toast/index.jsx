import React, { useState, useEffect } from "react"

export function Toast({ show, duration = 1000, className, ...props }) {
  const [visible, setVisible] = useState(show)
  const [animation, setAnimation] = useState("")

  useEffect(() => {
    if (show) {
      setVisible(true)
    }
    const timeout = setTimeout(() => {
      setAnimation("")
      setVisible(show)
    }, duration)
    setAnimation(show ? "showing" : "hiding")
    return () => clearTimeout(timeout)
  }, [show, duration])

  return visible ? <div className={animation} {...props} /> : null
}
