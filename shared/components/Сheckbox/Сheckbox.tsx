import { ComponentPropsWithoutRef, useId } from 'react'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { Typography } from '../Typography'
import s from './Сheckbox.module.scss'
import { clsx } from 'clsx'
import Check from '../../../public/icons/CheckMark'
import { Label } from 'radix-ui'

export type CheckboxProps = {
  label?: string
} & Omit<ComponentPropsWithoutRef<typeof CheckboxRadix.Root>, 'onChange'>

export const Checkbox = (
  { disabled, id, label, className, ...rest }: CheckboxProps,
  ref: React.RefObject<HTMLButtonElement>
) => {
  const useID = useId()
  const checkBoxID = id ?? useID

  const classNames = {
    label: clsx(s.label, disabled && s.disabled),
    container: clsx(s.container, className),
    root: s.root,
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
  }

  return (
    <div className={classNames.container}>
      <div className={classNames.buttonWrapper}>
        <CheckboxRadix.Root
          className={classNames.root}
          disabled={disabled}
          id={checkBoxID}
          ref={ref}
          {...rest}
        >
          <CheckboxRadix.Indicator>
            <Check />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
        <Label.Root asChild htmlFor={checkBoxID}>
          <Typography as={'label'} className={classNames.label} variant={'regular_14'}>
            {label}
          </Typography>
        </Label.Root>
      </div>
    </div>
  )
}
