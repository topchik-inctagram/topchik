import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'
import { ArrowIosDownOutline } from '@/public/icons'
import {
  type ComponentPropsWithRef,
  type ReactNode,
  type Ref,
  isValidElement,
  Children,
  type ReactElement,
  useId,
} from 'react'
import s from './Select.module.scss'
import { Label, Typography } from '@/shared/components'

type SelectProps = {
  className?: string
  placeholder?: string
  label?: string
  ref?: Ref<HTMLButtonElement>
  value: string
  onValueChange: (value: string) => void
  disabled?: boolean
  isPagination?: boolean
  isLanguageSwitcher?: boolean
  errorMessage?: string
} & ComponentPropsWithRef<typeof SelectRadix.Root>

export const Select = (props: SelectProps) => {
  const {
    className,
    placeholder = 'Select-Box',
    disabled,
    label,
    value,
    ref,
    onValueChange,
    isPagination = false,
    isLanguageSwitcher = false,
    errorMessage,
    children,
    ...rest
  } = props

  const selectedChild = Children.toArray(children).find(
    child => isValidElement<SelectProps>(child) && child.props.value === value
  ) as ReactElement<SelectItemProps>

  const selectId = useId()

  const classNames = {
    wrapper: clsx(
      s.selectWrapper,
      className,
      isPagination && s.pagination,
      isLanguageSwitcher && s.languageSwitcher
    ),
    trigger: clsx(
      s.trigger,
      errorMessage && s.error,
      isPagination && s.paginationTrigger,
      isLanguageSwitcher && s.languageSwitcherTrigger
    ),
    valueContainer: s.valueContainer,
    selectedIcon: s.selectedIcon,
    icon: s.icon,
    arrowDown: clsx(s.arrowDown, disabled && s.disabledArrow),
    content: clsx(s.content, isPagination && s.paginationContent),
    viewport: s.viewport,
    item: clsx(s.item, isPagination && s.paginationItem),
    optionContent: s.optionContent,
    optionIcon: s.optionIcon,
    label: clsx(s.label, disabled && s.disabledLabel),
  }

  return (
    <div className={classNames.wrapper}>
      <Label className={classNames.label} htmlFor={selectId}>
        {label}
      </Label>
      <SelectRadix.Root disabled={disabled} value={value} onValueChange={onValueChange} {...rest}>
        <SelectRadix.Trigger ref={ref} className={classNames.trigger} id={selectId}>
          <div className={classNames.valueContainer}>
            <SelectRadix.Value asChild placeholder={placeholder}>
              <Typography as="span" variant={isPagination ? 'regular_14' : 'regular_16'}>
                {selectedChild && isValidElement(selectedChild) ? (
                  <div className={s.optionContent}>{selectedChild.props.children}</div>
                ) : (
                  value || placeholder
                )}
              </Typography>
            </SelectRadix.Value>
          </div>
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

type SelectItemProps = {
  children: ReactNode
  className?: string
  value: string
  isPagination?: boolean
} & ComponentPropsWithRef<typeof SelectRadix.Item>

const SelectItem = ({ children, isPagination, className, value, ...props }: SelectItemProps) => {
  return (
    <SelectRadix.Item
      className={clsx(s.item, isPagination && s.paginationItem, className)}
      value={value}
      {...props}
    >
      <SelectRadix.ItemText asChild>
        <Typography variant={isPagination ? 'regular_14' : 'regular_16'}>
          <div className={s.optionContent}>{children}</div>
        </Typography>
      </SelectRadix.ItemText>
    </SelectRadix.Item>
  )
}
Select.Item = SelectItem
