import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { ComponentPropsWithRef } from 'react'
import s from './Popover.module.scss'
import clsx from 'clsx'

const Popover = PopoverPrimitive.Root

type PopoverTriggerProps = {
  fullWidth?: boolean
  error?: boolean
  disabled?: boolean
} & ComponentPropsWithRef<typeof PopoverPrimitive.Trigger>

const PopoverTrigger = (props: PopoverTriggerProps) => {
  const { fullWidth, error, ...rest } = props
  const classNames = {
    trigger: clsx(s.trigger, fullWidth && s.fullWidth, error && s.error),
  }
  return <PopoverPrimitive.Trigger {...rest} className={classNames.trigger} />
}

type PopoverContentProps = ComponentPropsWithRef<typeof PopoverPrimitive.Content>

const PopoverContent = (props: PopoverContentProps) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content {...props} />
    </PopoverPrimitive.Portal>
  )
}

PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
