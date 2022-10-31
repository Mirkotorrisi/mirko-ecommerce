import * as React from "react"
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"
export function NumericInput({
  onIncrement,
  onDecrement,
  className,
  disabled,
  ...props
}) {
  return (
    <div className="">
      <input disabled={disabled} type="numeric" className="" {...props} />
      <button
        disabled={disabled}
        className=""
        aria-label="Increment"
        onClick={onIncrement}
      >
        <span>+</span>
        <MdArrowDropUp />
      </button>
      <button
        disabled={disabled}
        className=""
        aria-label="Decrement"
        onClick={onDecrement}
      >
        <span>-</span>
        <MdArrowDropDown />
      </button>
    </div>
  )
}
