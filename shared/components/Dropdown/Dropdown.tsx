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
      trigger: s.trigger,
    }

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild className={classNames.trigger}>
          {trigger}
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className={classNames.content} align={align} ref={ref}>
            {children}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }
)
Dropdown.displayName = 'Dropdown'
