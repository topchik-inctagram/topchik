import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'
import ArrowDown from '../../../public/icons/ArrowIosDownOutline'
import ArrowUp from '../../../public/icons/ArrowIosUp'
import { ComponentPropsWithRef, ReactNode, Ref, useState } from 'react'
import s from './Select.module.scss'
import { Label } from '../Label/Label'

export type SelectOption = {
  value: string
  label: string
  icon?: ReactNode
}

export type SelectProps = {
  className?: string
  options: SelectOption[]
  placeholder?: string
  label?: string
  errorMessage?: string
  ref?: Ref<HTMLButtonElement>
  pagination?: boolean
} & ComponentPropsWithRef<typeof SelectRadix.Root>

export const Select = (props: SelectProps) => {
  const {
    className,
    options,
    placeholder = 'Select-Box',
    disabled,
    label,
    errorMessage,
    value,
    onChangeSelect,
    ref,
    defaultValue = '',
    pagination = false,
    ...rest
  } = props

  const [isOpen, setIsOpen] = useState(false)

  const handleValueChange = (val: string) => {
    if (pagination) {
      const numValue = parseInt(val)
      onChangeSelect?.(isNaN(numValue) ? val : numValue.toString())
    } else {
      onChangeSelect?.(val)
    }
  }

  return (
    <div className={clsx(s.selectWrapper, className, { [s.pagination]: pagination })}>
      {label && <Label>{label}</Label>}
      <SelectRadix.Root
        value={value}
        onValueChange={handleValueChange}
        disabled={disabled}
        defaultValue={defaultValue}
        onOpenChange={setIsOpen}
        {...rest}
      >
        <SelectRadix.Trigger ref={ref} className={clsx(s.trigger, errorMessage && s.error)}>
          <div className={s.valueContainer}>
            {value && options.find(opt => opt.value === value)?.icon}
            <SelectRadix.Value placeholder={placeholder}>
              {value && options.find(opt => opt.value === value)?.label}
            </SelectRadix.Value>
          </div>
          <SelectRadix.Icon className={s.icon}>
            {isOpen ? <ArrowUp /> : <ArrowDown />}
          </SelectRadix.Icon>
        </SelectRadix.Trigger>

        <SelectRadix.Portal>
          <SelectRadix.Content className={s.content} position="popper" sideOffset={5}>
            <SelectRadix.Viewport className={s.viewport}>
              {options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  <div className={s.optionContent}>
                    {option.icon && <span className={s.optionIcon}>{option.icon}</span>}
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
      {errorMessage && <span className={s.errorMessage}>{errorMessage}</span>}
    </div>
  )
}

const SelectItem = ({
  children,
  className,
  ...props
}: {
  children: ReactNode
  className?: string
  value: string
}) => {
  return (
    <SelectRadix.Item className={clsx(s.item, className)} {...props}>
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
    </SelectRadix.Item>
  )
}
