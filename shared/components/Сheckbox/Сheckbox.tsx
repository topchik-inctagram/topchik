import { ComponentPropsWithRef, useState, useId, Ref } from 'react'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import s from './Сheckbox.module.scss'
import { clsx } from 'clsx'
import CheckIcon from '../../../public/icons/CheckMark'
import { Label } from '../Label/Label'

export type CheckboxProps = {
  label?: string
  onCheckedChange?: (checked: boolean) => Promise<boolean> | void
  ref?: Ref<HTMLButtonElement>
  recaptchaMode?: boolean
} & ComponentPropsWithRef<typeof CheckboxRadix.Root>

export const Checkbox = ({
  disabled,
  id,
  label,
  className,
  checked: externalChecked,
  onCheckedChange,
  ref,
  recaptchaMode = false,
  ...rest
}: CheckboxProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [internalChecked, setInternalChecked] = useState(false)
  const useID = useId()
  const checkBoxID = id ?? useID

  const checked = recaptchaMode ? internalChecked : externalChecked

  const handleCheckedChange = async (newChecked: boolean) => {
    if (recaptchaMode) {
      setInternalChecked(true)
    }

    if (onCheckedChange) {
      setIsLoading(true)
      try {
        const success = await onCheckedChange(newChecked)
        setIsVerified(!!success)
        if (recaptchaMode) {
          setInternalChecked(!!success)
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  const classNames = {
    label: clsx(s.label, disabled && s.disabled),
    container: clsx(s.container, className),
    root: clsx(s.root, recaptchaMode && s.recaptchaRoot, isLoading && s.hidden),
    indicator: s.indicator,
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
    loader: s.loader,
  }

  return (
    <div className={classNames.container}>
      <div className={classNames.buttonWrapper}>
        {isLoading && recaptchaMode && <span className={classNames.loader}></span>}

        <CheckboxRadix.Root
          className={classNames.root}
          disabled={disabled || isLoading}
          checked={isVerified || checked}
          onCheckedChange={handleCheckedChange}
          id={checkBoxID}
          ref={ref}
          data-verified={isVerified}
          {...rest}
        >
          <CheckboxRadix.Indicator className={classNames.indicator}>
            {(isVerified || checked) && <CheckIcon />}
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
      </div>
      {label && (
        <Label className={classNames.label} htmlFor={checkBoxID}>
          {label}
        </Label>
      )}
    </div>
  )
}
