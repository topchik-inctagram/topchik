import { FC } from 'react'
import s from './Сheckbox.module.scss'
import { clsx } from 'clsx'
import * as LabelRadix from '@radix-ui/react-label'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import Check from './check'

export type CheckboxProps = {
  cheked?: boolean
  className?: string
  disabled?: boolean
  id?: string
  label?: string
  onChange?: (cheked: boolean) => void
  position?: 'left'
  required?: boolean
}

export const Сheckbox: FC<CheckboxProps> = ({
  cheked,
  className,
  disabled,
  id,
  label,
  onChange,
  position,
  required,
}) => {
  const classNames = {
    label: clsx(s.label, disabled && s.disabled),
    container: clsx(s.container, className),
    indicator: s.idicator,
    root: s.root,
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled, position === 'left' && s.left),
  }
  return (
    <div className={classNames.container}>
      <LabelRadix.Root asChild>
        <label className={classNames.label}>
          <div className={classNames.buttonWrapper}>
            <CheckboxRadix.Root
              checked={cheked}
              className={classNames.root}
              disabled={disabled}
              id={id}
              onCheckedChange={onChange}
              required={required}
            >
              {cheked && (
                <CheckboxRadix.Indicator className={classNames.indicator} forceMount>
                  <Check />
                </CheckboxRadix.Indicator>
              )}
            </CheckboxRadix.Root>
          </div>
          {label}
        </label>
      </LabelRadix.Root>
    </div>
  )
}
