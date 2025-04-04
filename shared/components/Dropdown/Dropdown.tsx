import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'
import s from './Dropdown.module.scss'
import clsx from 'clsx'

type DropdownProps = {
  trigger: ReactNode
  align?: 'start' | 'center' | 'end'
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root> &
  Omit<ComponentPropsWithoutRef<'div'>, 'onChange'>

export const Dropdown = forwardRef<React.ComponentRef<typeof DropdownMenu.Content>, DropdownProps>(
  ({ trigger, align = 'end', children, className, ...rest }, ref) => {
    const classNames = {
      content: clsx(s.content, className),
      trigger: clsx(s.trigger, className),
    }

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild className={classNames.trigger}>
          {trigger}
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className={classNames.content} align={align} ref={ref} {...rest}>
            {children}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }
)
Dropdown.displayName = 'Dropdown'

type DropdownLabelProps = ComponentPropsWithoutRef<typeof DropdownMenu.Label>

export const DropdownLabel = forwardRef<
  React.ComponentRef<typeof DropdownMenu.Label>,
  DropdownLabelProps
>(({ children, className, ...rest }, ref) => {
  const classNames = {
    label: clsx(s.label, className),
  }

  return (
    <DropdownMenu.Label className={classNames.label} ref={ref} {...rest}>
      {children}
    </DropdownMenu.Label>
  )
})

DropdownLabel.displayName = 'DropdownLabel'

type DropdownSeparatorProps = ComponentPropsWithoutRef<typeof DropdownMenu.Separator>

export const DropdownSeparator = forwardRef<
  React.ComponentRef<typeof DropdownMenu.Separator>,
  DropdownSeparatorProps
>(({ className, ...rest }, ref) => {
  const classNames = {
    separator: clsx(s.separator, className),
  }

  return <DropdownMenu.Separator ref={ref} className={classNames.separator} {...rest} />
})

DropdownSeparator.displayName = 'DropdownSeparator'

type DropdownArrowProps = Omit<ComponentPropsWithoutRef<'div'>, 'onChange'>

export const DropdownArrow = forwardRef<React.ComponentRef<'div'>, DropdownArrowProps>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      arrow: clsx(s.arrow, className),
    }
    return (
      <DropdownMenu.Arrow asChild>
        <div ref={ref} className={classNames.arrow} {...rest} />
      </DropdownMenu.Arrow>
    )
  }
)

DropdownArrow.displayName = 'DropdownArrow'

type DropdownItemProps = ComponentPropsWithoutRef<typeof DropdownMenu.Item>

export const DropdownItem = forwardRef<
  React.ComponentRef<typeof DropdownMenu.Item>,
  DropdownItemProps
>(({ children, className, ...rest }, ref) => {
  const classNames = {
    item: clsx(s.item, className),
  }
  return (
    <DropdownMenu.Item ref={ref} className={classNames.item} {...rest}>
      {children}
    </DropdownMenu.Item>
  )
})

DropdownItem.displayName = 'DropdownItem'
