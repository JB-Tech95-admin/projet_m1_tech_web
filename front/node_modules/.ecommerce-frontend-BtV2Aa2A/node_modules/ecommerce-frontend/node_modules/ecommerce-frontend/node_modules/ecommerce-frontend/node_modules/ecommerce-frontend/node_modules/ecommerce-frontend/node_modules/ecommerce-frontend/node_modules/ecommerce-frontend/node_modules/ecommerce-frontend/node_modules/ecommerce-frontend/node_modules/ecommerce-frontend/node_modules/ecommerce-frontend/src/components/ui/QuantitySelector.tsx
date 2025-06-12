import type React from "react"
import { Minus, Plus } from "lucide-react"
import Button from "./Button"

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (quantity: number) => void
  min?: number
  max?: number
  disabled?: boolean
}

const QuantitySelector = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  disabled = false,
}: QuantitySelectorProps) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
        className="w-8 h-8 p-0"
      >
        <Minus className="w-4 h-4" />
      </Button>

      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        disabled={disabled}
        min={min}
        max={max}
        className="w-16 text-center border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
      />

      <Button
        variant="outline"
        size="sm"
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
        className="w-8 h-8 p-0"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default QuantitySelector
