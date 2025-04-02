import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'
import ArrowDown from '../../../public/icons/ArrowIosDownOutline'
import { ComponentPropsWithRef, ReactNode, Ref } from 'react'
import s from './Select.module.scss'
import { Label } from '@/shared/components'

type SelectOption = {
  value: string
  label: string
  icon?: ReactNode
}

type SelectProps = {
  className?: string
  options: SelectOption[]
  placeholder?: string
  label?: string
  ref?: Ref<HTMLButtonElement>
  isPagination?: boolean
  errorMessage?: string
} & ComponentPropsWithRef<typeof SelectRadix.Root>

export const Select = (props: SelectProps) => {
  const {
    className,
    options,
    placeholder = 'Select-Box',
    disabled,
    label,
    value,
    ref,
    isPagination = false,
    errorMessage,
    ...rest
  } = props

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div className={clsx(s.selectWrapper, className, isPagination && s.pagination)}>
      <Label>{label}</Label>
      <SelectRadix.Root value={value} disabled={disabled} {...rest}>
        <SelectRadix.Trigger ref={ref} className={clsx(s.trigger, errorMessage && s.error)}>
          <div className={s.valueContainer}>
            {selectedOption?.icon && <span className={s.selectedIcon}>{selectedOption.icon}</span>}
            <SelectRadix.Value placeholder={placeholder}>
              {selectedOption?.label || placeholder}
            </SelectRadix.Value>
          </div>
          <SelectRadix.Icon className={s.icon}>
            <ArrowDown className={s.arrowDown} />
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
