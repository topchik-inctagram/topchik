import { type ComponentPropsWithRef, type ReactNode, useId } from 'react'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import s from './Checkbox.module.scss'
import { clsx } from 'clsx'
import { Vector } from '@/public/icons'
import { Label } from '@/shared/components'

export type CheckboxProps = {
  label?: string | ReactNode
} & ComponentPropsWithRef<typeof CheckboxRadix.Root>

export const Checkbox = ({ disabled, id, label, className, ...rest }: CheckboxProps) => {
  const generatedId = useId()
  const checkboxId = id ?? generatedId

  const classNames = {
    container: clsx(s.container, className),
    root: clsx(s.root, disabled && s.disabled),
    indicator: s.indicator,
    label: clsx(s.label, disabled && s.disabled),
  }

  return (
    <div className={classNames.container}>
      <CheckboxRadix.Root {...rest} className={classNames.root} disabled={disabled} id={checkboxId}>
        <CheckboxRadix.Indicator className={classNames.indicator}>
          <Vector />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      {label && (
        <Label className={classNames.label} htmlFor={checkboxId}>
          {label}
        </Label>
      )}
    </div>
  )
}
