import { ComponentPropsWithRef, ReactNode } from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import clsx from 'clsx'
import s from './RadioGroup.module.scss'

type Props = ComponentPropsWithRef<typeof RadioGroupPrimitive.Root>

export const RadioGroup = (props: Props) => {
  const { children, ...rest } = props

  const classNames = {
    container: clsx(s.wrapper),
    radioGroup: clsx(s.RadioGroupRoot),
  }

  return (
    <div className={classNames.container}>
      <RadioGroupPrimitive.Root className={classNames.radioGroup} {...rest}>
        {children}
      </RadioGroupPrimitive.Root>
    </div>
  )
}
