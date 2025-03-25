import { useId, ComponentPropsWithRef } from 'react'
import s from './Textarea.module.scss'
import clsx from 'clsx'
import { Label } from '@/shared/components/Label/Label'


export type TextareaProps = {
  id?: string
  titleLabel?: string
  error?: string
  className?: string
} & ComponentPropsWithRef<'textarea'>

export const Textarea = (props: TextareaProps) => {
  const { id, titleLabel, error, className, ...rest } = props
  const generatedId = useId()
  const finalId = id || generatedId  

  const classes = {
    container: clsx(s.textareaRoot, className),
    label: s.textAreaLabel,
    textarea: clsx(s.textArea, error && s.errorBorder, rest.disabled && s.disabled),
    errorText: s.textAreaError,
  }

  return (
    <div className={classes.container}>
      {titleLabel && (
        <Label className={classes.label} htmlFor={finalId}>
          {titleLabel}
        </Label>
      )}
      <textarea id={finalId} className={classes.textarea} {...rest} />
      {error && <span className={classes.errorText}>{error}</span>}
    </div>
  )
}
