import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import clsx from 'clsx'
import s from '@/shared/components/radiogroup/radiogroup.module.scss'

export type Option = {
  value: string | number
  label: string
}

type RadixRadioGroupProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>

export type RadioGroupProps = {
  value?: string
  onValueChange?: (value: string) => void
  options: Option[]
  defaultValue?: string
  className?: string
  errorMsg?: string
} & RadixRadioGroupProps

export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
  ({ options, onValueChange, value, defaultValue, errorMsg, ...rest }, ref) => {
    return (
      <div className={s.wrapper}>
        <RadioGroupPrimitive.Root
          ref={ref}
          className={clsx(s.RadioGroupRoot, rest.className)}
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={rest.disabled}
          aria-label="Radio group"
        >
          {options.map(option => {
            const labelClass = rest.disabled ? s.LabelColorDisabled : ''

            return (
              <div key={option.value} style={{ display: 'flex', alignItems: 'center' }}>
                <label className={clsx(s.Label, labelClass)}>
                  <RadioGroupPrimitive.Item
                    className={clsx(s.RadioGroupItem)}
                    value={option.label}
                    disabled={rest.disabled}
                  >
                    <RadioGroupPrimitive.Indicator className={s.RadioGroupIndicator} />
                  </RadioGroupPrimitive.Item>
                  {option.label}
                </label>
              </div>
            )
          })}
        </RadioGroupPrimitive.Root>

        {errorMsg && <div className={clsx(s.errorMsg, errorMsg && s.show)}>{errorMsg}</div>}
      </div>
    )
  }
)
