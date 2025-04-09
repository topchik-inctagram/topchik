import { useId, type ComponentPropsWithRef } from 'react'
import s from './Textarea.module.scss'
import clsx from 'clsx'
import { Label, Typography } from '@/shared/components'

type Props = {
  label?: string
  error?: string
} & ComponentPropsWithRef<'textarea'>

export const Textarea = (props: Props) => {
  const { id, label, error, className, disabled, ...rest } = props
  const generatedId = useId()
  const finalId = id || generatedId

  const classNames = {
    container: clsx(s.textareaRoot, className),
    label: s.textAreaLabel,
    textarea: clsx(s.textArea, error && s.errorBorder, disabled && s.disabled),
    errorText: s.textAreaError,
  }

  return (
    <div className={classNames.container}>
      {label && (
        <Label className={classNames.label} htmlFor={finalId}>
          {label}
        </Label>
      )}
      <textarea className={classNames.textarea} id={finalId} {...rest} />
      {error && (
        <Typography as="span" className={classNames.errorText} variant="regular_14">
          {error}
        </Typography>
      )}
    </div>
  )
}
