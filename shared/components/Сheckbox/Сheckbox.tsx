import { ComponentPropsWithoutRef, useId } from 'react'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import s from './Сheckbox.module.scss'
import { clsx } from 'clsx'
import CheckIcon from '../../../public/icons/CheckMark'
import { Label } from '../Label/Label'

export type CheckboxProps = {
  label?: string
  checked?: boolean
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = (
  { disabled, id, label, className, checked, ...rest }: CheckboxProps,
  ref: React.RefObject<HTMLButtonElement>
) => {
  const useID = useId()
  const checkBoxID = id ?? useID

  const classNames = {
    label: clsx(s.label, disabled && s.disabled),
    container: clsx(s.container, className),
    root: s.root,
    indicator: s.indicator,
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
  }

  return (
    <div className={classNames.container}>
      <div className={classNames.buttonWrapper}>
        <CheckboxRadix.Root
          className={classNames.root}
          disabled={disabled}
          checked={checked}
          id={checkBoxID}
          ref={ref}
          {...rest}
        >
          {checked && (
            <CheckboxRadix.Indicator className={classNames.indicator}>
              <CheckIcon />
            </CheckboxRadix.Indicator>
          )}
        </CheckboxRadix.Root>
      </div>
      <Label className={classNames.label} htmlFor={checkBoxID}>
        {label}
      </Label>
    </div>
  )
}
