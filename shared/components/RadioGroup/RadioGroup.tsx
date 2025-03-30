import { ComponentPropsWithRef, ReactNode } from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import clsx from 'clsx'
import s from './RadioGroup.module.scss'

export type RadioGroupProps = {
  value?: string
  onValueChange?: (value: string) => void
  children?: ReactNode
} & ComponentPropsWithRef<typeof RadioGroupPrimitive.Root>

export const RadioGroup = (props: RadioGroupProps) => {
  const { value, onValueChange, children, ...rest } = props

  const classNames = {
    container: clsx(s.wrapper),
    radioGroup: clsx(s.RadioGroupRoot),
  }

  return (
    <div className={classNames.container}>
      <RadioGroupPrimitive.Root
        className={classNames.radioGroup}
        value={value}
        onValueChange={onValueChange}
        {...rest}
      >
        {children}
      </RadioGroupPrimitive.Root>
    </div>
  )
}
