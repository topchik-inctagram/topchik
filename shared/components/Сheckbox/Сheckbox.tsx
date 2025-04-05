import { type ComponentPropsWithRef, useId, useState, useEffect } from 'react'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import s from './Сheckbox.module.scss'
import { clsx } from 'clsx'
import { CheckmarkOutline, CheckmarkRecaptcha } from '@/public'
import { Label } from '@/shared/components'

export type CheckboxProps = {
  label?: string
  isRecaptcha?: boolean
  onRecaptchaComplete?: () => void
} & ComponentPropsWithRef<typeof CheckboxRadix.Root>

export const Checkbox = ({
  disabled,
  id,
  label,
  className,
  checked: externalChecked,
  isRecaptcha = false,
  onRecaptchaComplete,
  ...rest
}: CheckboxProps) => {
  const generatedId = useId()
  const checkboxId = id ?? generatedId
  const [internalChecked, setInternalChecked] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const checked = isRecaptcha 
    ? isVerified || internalChecked 
    : externalChecked ?? internalChecked

  const handleCheckedChange = (newChecked: boolean) => {
    if (disabled) return
    
    if (isRecaptcha) {
      if (!isVerified) {
        setInternalChecked(newChecked)
        setIsVerified(newChecked)
        if (newChecked) {
          onRecaptchaComplete?.()
        }
      }
    } else {
      setInternalChecked(newChecked)
    }
  }

  const classNames = {
    container: clsx(s.container, className),
    root: clsx(
      s.root,
      disabled && s.disabled,
      isRecaptcha && s.recaptchaRoot,
      isVerified && s.verified
    ),
    indicator: s.indicator,
    label: clsx(s.label, disabled && s.disabled),
  }

  return (
    <div className={classNames.container}>
      <CheckboxRadix.Root
        {...rest}
        className={classNames.root}
        checked={checked}
        disabled={disabled}
        id={checkboxId}
        data-recaptcha={isRecaptcha}
        data-verified={isVerified}
        onCheckedChange={handleCheckedChange}
      >
        <CheckboxRadix.Indicator className={classNames.indicator}>
          {isRecaptcha ? (
            <CheckmarkRecaptcha />
          ) : (
            <CheckmarkOutline />
          )}
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
        <Label className={classNames.label} htmlFor={checkboxId}>
          {label}
        </Label>
    </div>
  )
}