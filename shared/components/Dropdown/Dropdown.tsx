import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ComponentPropsWithRef, ReactNode } from 'react'
import s from './Dropdown.module.scss'
import clsx from 'clsx'

type DropdownProps = {
  trigger: ReactNode
  align?: 'start' | 'center' | 'end'
} & ComponentPropsWithRef<typeof DropdownMenu.Root> &
  Omit<ComponentPropsWithRef<'div'>, 'onChange'>

export const Dropdown = ({
  trigger,
  align = 'end',
  children,
  className,
  ref,
  ...rest
}: DropdownProps) => {
  const classNames = {
    content: clsx(s.content, className),
    trigger: clsx(s.trigger, className),
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={classNames.trigger}>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={classNames.content} align={align} ref={ref} {...rest}>
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
Dropdown.displayName = 'Dropdown'

type DropdownLabelProps = ComponentPropsWithRef<typeof DropdownMenu.Label>

export const DropdownLabel = ({ children, className, ref, ...rest }: DropdownLabelProps) => {
  const classNames = {
    label: clsx(s.label, className),
  }

  return (
    <DropdownMenu.Label className={classNames.label} ref={ref} {...rest}>
      {children}
    </DropdownMenu.Label>
  )
}

DropdownLabel.displayName = 'DropdownLabel'

type DropdownSeparatorProps = ComponentPropsWithRef<typeof DropdownMenu.Separator>

export const DropdownSeparator = ({ className, ref, ...rest }: DropdownSeparatorProps) => {
  const classNames = {
    separator: clsx(s.separator, className),
  }

  return <DropdownMenu.Separator ref={ref} className={classNames.separator} {...rest} />
}

DropdownSeparator.displayName = 'DropdownSeparator'

type DropdownArrowProps = Omit<ComponentPropsWithRef<'div'>, 'onChange'>

export const DropdownArrow = ({ className, ref, ...rest }: DropdownArrowProps) => {
  const classNames = {
    arrow: clsx(s.arrow, className),
  }
  return (
    <DropdownMenu.Arrow asChild>
      <div ref={ref} className={classNames.arrow} {...rest} />
    </DropdownMenu.Arrow>
  )
}

DropdownArrow.displayName = 'DropdownArrow'

type DropdownItemProps = ComponentPropsWithRef<typeof DropdownMenu.Item>

export const DropdownItem = ({ children, className, ref, ...rest }: DropdownItemProps) => {
  const classNames = {
    item: clsx(s.item, className),
  }
  return (
    <DropdownMenu.Item ref={ref} className={classNames.item} {...rest}>
      {children}
    </DropdownMenu.Item>
  )
}

DropdownItem.displayName = 'DropdownItem'
