import * as React from "react"

export function CheckFilter({
  items,
  name,
  selectedItems = [],
  setSelectedItems,
  open = true,
}) {
  const toggleItem = ({ currentTarget: input }) => {
    if (input.checked) {
      setSelectedItems([...selectedItems, input.value])
    } else {
      const idx = selectedItems.indexOf(input.value)
      if (idx === -1) {
        return
      }
      const newItems = [
        ...selectedItems.slice(0, idx),
        ...selectedItems.slice(idx + 1),
      ]
      setSelectedItems(newItems)
    }
  }

  const clearItems = () => {
    setSelectedItems([])
  }

  return (
    <details open={open} className="">
      {name && (
        <summary>
          <div className="">
            {name}{" "}
            {selectedItems.length ? (
              <button className="" onClick={clearItems}>
                Clear
              </button>
            ) : undefined}
          </div>
        </summary>
      )}
      <div className="">
        {items.map((item) => (
          <label
            className={
              selectedItems.includes(item) ? "selectedLabel" : undefined
            }
            key={item}
          >
            <input
              type="checkbox"
              className=""
              onChange={toggleItem}
              value={item}
              checked={selectedItems.includes(item)}
            />{" "}
            {item || "None"}
          </label>
        ))}
      </div>
    </details>
  )
}
