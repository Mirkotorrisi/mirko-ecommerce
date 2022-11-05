import * as React from "react"
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"
import "./index.scss"
export function NumericInput({
  onIncrement,
  onDecrement,
  className,
  disabled,
  ...props
}) {
  return (
    <div className="numeric flex items-center justify-center flex-col">
      <button
        disabled={disabled}
        className="numeric__button"
        aria-label="Increment"
        onClick={onIncrement}
      >
        <span>+</span>
        <MdArrowDropUp />
      </button>
      <input
        disabled={disabled}
        type="numeric"
        className="numeric__input text-center"
        {...props}
      />
      <button
        disabled={disabled}
        className="numeric__button"
        aria-label="Decrement"
        onClick={onDecrement}
      >
        <MdArrowDropDown />
        <span>-</span>
      </button>
    </div>
  )
}
