'use client'

import { type ComponentPropsWithRef, useId } from 'react'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import s from './Сheckbox.module.scss'
import { clsx } from 'clsx'
import { CheckmarkOutline } from '@/public'
import { Label } from '@/shared/components'

export type CheckboxProps = {
  label?: string
} & ComponentPropsWithRef<typeof CheckboxRadix.Root>

export const Checkbox = ({ disabled, id, label, className, checked, ...rest }: CheckboxProps) => {
  const useID = useId()
  const checkBoxID = id ?? useID
  const classNames = {
    label: clsx(s.label, disabled && s.disabled),
    container: clsx(s.container, className),
    root: clsx(s.root),
    indicator: s.indicator,
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
    loader: s.loader,
  }

  return (
    <div className={classNames.container}>
      <CheckboxRadix.Root
        {...rest}
        checked={checked}
        className={classNames.root}
        disabled={disabled}
        id={checkBoxID}
      >
        <CheckboxRadix.Indicator className={classNames.indicator}>
          {checked === true && <CheckmarkOutline />}
          {checked === 'indeterminate' && <span className={classNames.loader}></span>}
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      {label && (
        <Label className={classNames.label} htmlFor={checkBoxID}>
          {label}
        </Label>
      )}
    </div>
  )
}
