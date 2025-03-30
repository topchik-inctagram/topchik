import { ReactNode } from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import clsx from 'clsx'
import s from './RadioGroup.module.scss'
import { Label } from '@/shared/components'

export type RadioItemProps = {
  value: string
  disabled?: boolean
  children: ReactNode
}

export const RadioItem = (props: RadioItemProps) => {
  const { value, disabled, children, ...rest } = props

  const classNames = {
    itemWrapper: clsx(s.itemWrapper),
    label: clsx(s.Label, disabled && s.LabelColorDisabled),
    radioItem: clsx(s.RadioGroupItem),
    radioIndicator: clsx(s.RadioGroupIndicator),
  }

  return (
    <div className={classNames.itemWrapper}>
      <Label className={classNames.label}>
        <RadioGroupPrimitive.Item
          value={value}
          disabled={disabled}
          className={classNames.radioItem}
          {...rest}
        >
          <RadioGroupPrimitive.Indicator className={classNames.radioIndicator} />
        </RadioGroupPrimitive.Item>
        {children}
      </Label>
    </div>
  )
}
