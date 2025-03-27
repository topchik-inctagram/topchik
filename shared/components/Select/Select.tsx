import { Select as RadixSelect } from 'radix-ui'
import styles from './Select.module.scss'
import classnames from 'classnames'
import ArrowDown from '../../../public/icons/ArrowIosDownOutline'
import ArrowUp from '../../../public/icons/ArrowIosUp'
import { Typography } from '../Typography'
import { forwardRef, ReactNode, useState } from 'react'

export type SelectProps = {
  onChange?: (value: string) => void
  className?: string
  disabled?: boolean
  value: string
  label: string
  options: { value: string; label: string }[]
}

type SelectItemProps = {
  children: ReactNode
  className?: string
  value: string
}

export const Select = ({ label, className, disabled, value, options, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  const handleSelectChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue)
    }
  }
  const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ children, className, ...props }, forwardedRef) => {
      return (
        <RadixSelect.Item
          className={classnames(styles.Item, className)}
          {...props}
          ref={forwardedRef}
        >
          <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
          <RadixSelect.ItemIndicator className={styles.ItemIndicator}></RadixSelect.ItemIndicator>
        </RadixSelect.Item>
      )
    }
  )
  return (
    <RadixSelect.Root
      value={value}
      onOpenChange={handleOpenChange}
      onValueChange={handleSelectChange}
    >
      <Typography as="label" variant="medium_14">
        {label}
      </Typography>
      <RadixSelect.Trigger className={styles.Trigger} aria-label="Food">
        <RadixSelect.Value placeholder="Select-Box" />
        <RadixSelect.Icon className={styles.Icon}>
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className={styles.Content}>
          <RadixSelect.ScrollUpButton className={styles.ScrollButton}>
            <ArrowUp />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className={styles.Viewport}>
            <RadixSelect.Group>
              {options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </RadixSelect.Group>
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className={styles.ScrollButton}>
            <ArrowDown />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
