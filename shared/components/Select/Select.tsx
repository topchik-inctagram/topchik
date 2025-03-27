import * as RadixSelect from '@radix-ui/react-select'
import s from './Select.module.scss'
import { clsx } from 'clsx'
import { forwardRef } from 'react'
import { Typography } from '../Typography'

export type SelectProps = {
  onChange?: (value: string) => void
  className?: string
  disabled?: boolean
  value: string
  label: string
  options: { value: string; label: string }[]
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ className, disabled, value, onChange, label, options }, ref) => {
    const classNames = {
      container: clsx(s.container, className),
      label: clsx(s.label, disabled && s.disabled),
      select: clsx(s.select, disabled && s.disabled),
      scrollBtn: clsx(s.scrollBtn, className),
      content: clsx(s.content, className),
    }

    return (
      <div className={classNames.container} ref={ref}>
        <Typography className={classNames.label} as="label" variant="medium_14">
          {label}
        </Typography>
        <RadixSelect.Root value={value} onValueChange={onChange}>
          <RadixSelect.Trigger
            className={classNames.select}
            aria-label="Select an option"
            disabled={disabled}
          >
            <RadixSelect.Value placeholder="Select-Box" />
          </RadixSelect.Trigger>
          <RadixSelect.Portal>
            <RadixSelect.Content className={classNames.content}>
              <RadixSelect.ScrollUpButton className={classNames.scrollBtn} />
              <RadixSelect.Viewport>
                {options.map(option => (
                  <RadixSelect.Item key={option.value} value={option.value}>
                    <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>
              <RadixSelect.ScrollDownButton />
            </RadixSelect.Content>
          </RadixSelect.Portal>
          <RadixSelect.Icon />
        </RadixSelect.Root>
      </div>
    )
  }
)

export default Select
