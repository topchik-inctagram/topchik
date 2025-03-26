import { forwardRef } from 'react'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { Typography } from '../Typography'
import s from './Сheckbox.module.scss'
import { clsx } from 'clsx'
import Check from '../../../public/icons/Recaptcha'
import { Label } from '../Label/Label'

type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  id?: string
  label?: string
  onChange?: (checked: boolean) => void
  position?: 'left'
  required?: boolean
} & React.ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked, className, disabled, id, label, onChange, position, required, ...rest }, ref) => {
    const classNames = {
      label: clsx(s.label, disabled && s.disabled),
      container: clsx(s.container, className),
      indicator: s.indicator,
      root: s.root,
      buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled, position === 'left' && s.left),
    }

    return (
      <div className={classNames.container}>
        <Label className={classNames.label}>
          <div className={classNames.buttonWrapper}>
            <CheckboxRadix.Root
              ref={ref}
              checked={checked}
              className={classNames.root}
              disabled={disabled}
              id={id}
              onCheckedChange={onChange}
              required={required}
              {...rest}
            >
              {checked && (
                <CheckboxRadix.Indicator className={classNames.indicator} forceMount>
                  <Check />
                </CheckboxRadix.Indicator>
              )}
            </CheckboxRadix.Root>
          </div>
          <Typography as={'label'} className={classNames.label} variant={'medium_14'}>
            {label}
          </Typography>
        </Label>
      </div>
    )
  }
)
