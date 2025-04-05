import * as TabsPrimitive from '@radix-ui/react-tabs'
import s from './Tabs.module.scss'
import clsx from 'clsx'
import { ComponentPropsWithRef } from 'react'

type TabsRootProps = {
  label?: string
} & ComponentPropsWithRef<typeof TabsPrimitive.Root>

export const TabsRoot = ({
  label,
  className,
  children,
  ref,
  defaultValue,
  ...rest
}: TabsRootProps) => {
  const classNames = {
    label: s.label,
    root: clsx(s.root, className),
  }

  return (
    <TabsPrimitive.Root className={classNames.root} ref={ref} defaultValue={defaultValue} {...rest}>
      {children}
    </TabsPrimitive.Root>
  )
}

TabsRoot.displayName = 'TabsRoot'

type ListProps = TabsPrimitive.TabsListProps

export const TabsList = ({ className, children, ...rest }: ListProps) => {
  const classNames = {
    list: clsx(s.list, className),
  }

  return (
    <TabsPrimitive.List className={classNames.list} {...rest}>
      {children}
    </TabsPrimitive.List>
  )
}

TabsList.displayName = 'TabsList'

type TabsProps = ComponentPropsWithRef<typeof TabsPrimitive.Trigger>

export const TabsTrigger = ({ className, children, ref, value, ...rest }: TabsProps) => {
  const classNames = {
    trigger: clsx(s.trigger, className),
  }

  return (
    <TabsPrimitive.Trigger value={value} className={classNames.trigger} ref={ref} {...rest}>
      {children}
    </TabsPrimitive.Trigger>
  )
}

TabsTrigger.displayName = 'TabsTrigger'

export const TabsContent = ({
  className,
  children,
  value,
  ...rest
}: TabsPrimitive.TabsContentProps) => {
  const classNames = {
    content: clsx(s.content, className),
  }
  return (
    <TabsPrimitive.Content className={classNames.content} value={value} {...rest}>
      {children}
    </TabsPrimitive.Content>
  )
}

TabsContent.displayName = 'TabsContent'
