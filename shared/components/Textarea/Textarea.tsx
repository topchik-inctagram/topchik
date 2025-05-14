import { useId, type ComponentPropsWithRef } from 'react'
import s from './Textarea.module.scss'
import clsx from 'clsx'
import { Label, Typography } from '@/shared/components'

type Props = {
  label?: string
  error?: string
  showCharacterCount?: boolean
  maxLength?: number
} & ComponentPropsWithRef<'textarea'>

export const Textarea = (props: Props) => {
  const { id, label, error, className, disabled, showCharacterCount, maxLength, value, ...rest } =
    props

  const generatedId = useId()
  const finalId = id || generatedId

  const classNames = {
    container: clsx(s.textareaRoot, className),
    label: s.textAreaLabel,
    textarea: clsx(s.textArea, error && s.errorBorder, disabled && s.disabled),
    errorText: s.textAreaError,
    characterCounter: s.characterCount,
  }

  const currentLength = typeof value === 'string' ? value.length : 0

  return (
    <div className={classNames.container}>
      {label && (
        <Label className={classNames.label} htmlFor={finalId}>
          {label}
        </Label>
      )}
      <textarea
        className={classNames.textarea}
        disabled={disabled}
        id={finalId}
        maxLength={maxLength}
        value={value}
        {...rest}
      />
      {showCharacterCount && typeof maxLength === 'number' && (
        <div className={classNames.characterCounter}>
          {currentLength}/{maxLength}
        </div>
      )}
      {error && (
        <Typography as="span" className={classNames.errorText} variant="regular_14">
          {error}
        </Typography>
      )}
    </div>
  )
}
