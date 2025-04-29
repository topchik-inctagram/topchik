import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'
import { ArrowIosDownOutline } from '@/public/icons'
import { type ComponentPropsWithRef, type RefObject, useId } from 'react'
import s from './Select.module.scss'
import { Label, Typography } from '@/shared/components'

export interface SelectProps extends ComponentPropsWithRef<typeof SelectRadix.Root> {
  label?: string
  isPagination?: boolean
  isLanguageSwitcher?: boolean
  className?: string
  placeholder?: string
  id?: string
  ref?: RefObject<HTMLButtonElement>
}

export const Select = (props: SelectProps) => {
  const {
    className,
    placeholder,
    disabled,
    label,
    id,
    value,
    ref,
    isPagination = false,
    isLanguageSwitcher = false,
    children,
    ...rest
  } = props

  const getId = useId()
  const selectId = id ?? getId

  const classNames = {
    wrapper: clsx(
      s.selectWrapper,
      isPagination && s.pagination,
      isLanguageSwitcher && s.languageSwitcher,
      className
    ),
    trigger: clsx(
      s.trigger,
      isPagination && s.paginationTrigger,
      isLanguageSwitcher && s.languageSwitcher
    ),
    icon: s.icon,
    arrowDown: clsx(s.arrowDown, disabled && s.disabledArrow),
    content: clsx(s.content, isPagination && s.paginationContent),
    viewport: s.viewport,
  }

  return (
    <div className={classNames.wrapper}>
      <Label htmlFor={selectId}>{label}</Label>
      <SelectRadix.Root disabled={disabled} value={value} {...rest}>
        <SelectRadix.Trigger ref={ref} className={classNames.trigger} id={selectId}>
          <SelectRadix.Value aria-label={value} placeholder={placeholder} />
          <SelectRadix.Icon className={classNames.icon}>
            <ArrowIosDownOutline className={classNames.arrowDown} />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>

        <SelectRadix.Portal>
          <SelectRadix.Content className={classNames.content} position="popper" sideOffset={-1}>
            <SelectRadix.Viewport className={classNames.viewport}>{children}</SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}

interface SelectItemProps extends ComponentPropsWithRef<typeof SelectRadix.Item> {
  isPagination?: boolean
}

const SelectItem = ({ children, isPagination, className, ...props }: SelectItemProps) => {
  return (
    <SelectRadix.Item
      className={clsx(s.item, isPagination && s.paginationItem, className)}
      {...props}
    >
      <SelectRadix.ItemText asChild>
        <Typography
          as="span"
          className={s.textShow}
          variant={isPagination ? 'regular_14' : 'regular_16'}
        >
          {children}
        </Typography>
      </SelectRadix.ItemText>
    </SelectRadix.Item>
  )
}
Select.Item = SelectItem
