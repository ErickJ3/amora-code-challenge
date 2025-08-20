import { forwardRef } from 'react'
import { NumericFormat } from 'react-number-format'
import { Input } from '~/components/ui/input'

interface PercentageInputProps {
  value?: number
  onValueChange?: (value: number | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  min?: number
  max?: number
  step?: number
}

export const PercentageInput = forwardRef<
  HTMLInputElement,
  PercentageInputProps
>(
  (
    {
      value,
      onValueChange,
      placeholder,
      className,
      disabled,
      min,
      max,
      step,
      ...props
    },
    ref,
  ) => {
    return (
      <NumericFormat
        {...props}
        getInputRef={ref}
        value={value}
        onValueChange={(values) => {
          const { floatValue } = values
          if (floatValue !== undefined) {
            if (min !== undefined && floatValue < min) return
            if (max !== undefined && floatValue > max) return
          }
          onValueChange?.(floatValue)
        }}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        fixedDecimalScale={false}
        allowNegative={false}
        placeholder={placeholder}
        customInput={Input}
        className={className}
        disabled={disabled}
        suffix="%"
      />
    )
  },
)
