import { type ComponentPropsWithRef, ReactNode, useId } from 'react'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import s from './Checkbox.module.scss'
import { clsx } from 'clsx'
import { Vector } from '@/public'
import { Label } from '@/shared/components'

export type CheckboxProps = {
  label?: ReactNode,
  rootClassName?: string
  indicatorClassName?: string
  labelClassName?: string
} & ComponentPropsWithRef<typeof CheckboxRadix.Root>

export const Checkbox = ({
  disabled,
  id,
  label,
  className,
  checked,
  onCheckedChange,
  indicatorClassName,
  rootClassName,
  labelClassName,
  ...rest
}: CheckboxProps) => {
  const generatedId = useId()
  const checkboxId = id ?? generatedId

  const classNames = {
    container: clsx(s.container, className),
    root: clsx(s.root, disabled && s.disabled, rootClassName),
    indicator: s.indicator, indicatorClassName,
    label: clsx(s.label, disabled && s.disabled, labelClassName),
  }

  return (
    <div className={classNames.container}>
      <CheckboxRadix.Root
        {...rest}
        checked={checked}
        className={classNames.root}
        disabled={disabled}
        id={checkboxId}
        onCheckedChange={onCheckedChange}
      >
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
