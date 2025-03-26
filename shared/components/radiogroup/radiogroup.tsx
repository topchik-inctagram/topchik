import React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import clsx from 'clsx'
import s from '@/shared/components/radiogroup/Radiogroup.module.scss'

export type Option = {
  value: string | number
  label: string
}

export type RadioGroupProps = {
  value?: string
  onValueChange?: (value: string) => void
  options: Option[]
  defaultValue?: string
  className?: string
  errorMsg?: string
} & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>

export const RadioGroup = (props: RadioGroupProps) => {
  const { options, onValueChange, value, defaultValue, errorMsg, className, ...rest } = props

  const classes = {
    container: clsx(s.wrapper, className),
    radioGroup: clsx(s.RadioGroupRoot),
    label: clsx(s.Label, rest.disabled && s.LabelColorDisabled),
    radioItem: s.RadioGroupItem,
    radioIndicator: s.RadioGroupIndicator,
    errorText: clsx(s.errorMsg, errorMsg && s.show),
  }

  return (
    <div className={classes.container}>
      <RadioGroupPrimitive.Root
        className={classes.radioGroup}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={rest.disabled}
        aria-label="Radio group"
        {...rest}
      >
        {options.map((option) => (
          <div key={option.value} className={s.itemWrapper}>
            <label className={classes.label}>
              <RadioGroupPrimitive.Item
                className={classes.radioItem}
                value={option.label}
                disabled={rest.disabled}
              >
                <RadioGroupPrimitive.Indicator className={classes.radioIndicator} />
              </RadioGroupPrimitive.Item>
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroupPrimitive.Root>
      {errorMsg && <div className={classes.errorText}>{errorMsg}</div>}
    </div>
  )
}
