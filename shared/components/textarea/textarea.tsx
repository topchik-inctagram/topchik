import { useId, ComponentPropsWithoutRef } from 'react'
import s from './Textarea.module.scss'
import clsx from 'clsx'
import { Label } from '@/shared/components/Label/Label'

export type TextareaProps = {
  id?: string
  titleLabel?: string
  error?: string
  className?: string
  placeholder?: string
  disabled?: boolean
} & Omit<ComponentPropsWithoutRef<'textarea'>, 'id' | 'className' | 'placeholder' | 'disabled'>

export const Textarea = (props: TextareaProps) => {
  const {
    id: passedId,
    titleLabel,
    error,
    className,
    placeholder = 'Enter message',
    disabled = false,
    ...rest
  } = props

  const generatedId = useId()
  const id = passedId || generatedId

  const containerClassName = clsx(s.textareaRoot, className)
  const textareaClassName = clsx(s.textArea, error && s.errorBorder)

  return (
    <div className={containerClassName}>
      {titleLabel && (
        <Label className={s.textAreaLabel} htmlFor={id}>
          {titleLabel}
        </Label>
      )}
      <textarea
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        className={textareaClassName}
        {...rest}
      />
      {error && <span className={s.textAreaError}>{error}</span>}
    </div>
  )
}
