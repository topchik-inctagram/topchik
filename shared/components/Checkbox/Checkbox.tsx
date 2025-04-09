import { type ComponentPropsWithRef, type ReactNode, useId, useState } from 'react'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import s from './Checkbox.module.scss'
import { clsx } from 'clsx'
import { CheckmarkRecaptcha, Vector } from '@/public/icons'
import { Label } from '@/shared/components'

export type CheckboxProps = {
  label?: string | ReactNode
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

  const getCheckedState = () => {
    switch (true) {
      case isRecaptcha:
        return isVerified || internalChecked
      default:
        return externalChecked ?? internalChecked
    }
  }

  const checked = getCheckedState()

  const handleCheckedChange = (newChecked: boolean) => {
    if (disabled) {
      return
    }
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
    container: clsx(s.container, isRecaptcha && s.containerRecaptcha, className),
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
    <div className={classNames.container} data-recaptcha={isRecaptcha}>
      <CheckboxRadix.Root
        {...rest}
        checked={checked}
        className={classNames.root}
        data-recaptcha={isRecaptcha}
        data-verified={isVerified}
        disabled={disabled}
        id={checkboxId}
        onCheckedChange={handleCheckedChange}
      >
        <CheckboxRadix.Indicator className={classNames.indicator}>
          {isRecaptcha ? <CheckmarkRecaptcha /> : <Vector />}
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      <Label className={classNames.label} htmlFor={checkboxId}>
        {label}
      </Label>
    </div>
  )
}
