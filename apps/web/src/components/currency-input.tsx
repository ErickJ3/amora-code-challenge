import { forwardRef } from 'react'
import { NumericFormat } from 'react-number-format'
import { Input } from '~/components/ui/input'

interface CurrencyInputProps {
  value?: number
  onValueChange?: (value: number | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    { value, onValueChange, placeholder, className, disabled, ...props },
    ref,
  ) => {
    return (
      <NumericFormat
        {...props}
        getInputRef={ref}
        value={value}
        onValueChange={(values) => {
          const { floatValue } = values
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
      />
    )
  },
)
