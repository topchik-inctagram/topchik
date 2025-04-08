import * as TabsPrimitive from '@radix-ui/react-tabs'
import s from './Tabs.module.scss'
import clsx from 'clsx'
import { type ComponentPropsWithRef } from 'react'

type TabsRootProps = {
  label?: string
} & ComponentPropsWithRef<typeof TabsPrimitive.Root>

export const TabsRoot = ({ className, children, ...rest }: TabsRootProps) => {
  const classNames = {
    label: s.label,
    root: clsx(s.root, className),
  }

  return (
    <TabsPrimitive.Root className={classNames.root} {...rest}>
      {children}
    </TabsPrimitive.Root>
  )
}

TabsRoot.displayName = 'TabsRoot'

type ListProps = ComponentPropsWithRef<typeof TabsPrimitive.List>

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

export const TabsTrigger = ({ className, children, ...rest }: TabsProps) => {
  const classNames = {
    trigger: clsx(s.trigger, className),
  }

  return (
    <TabsPrimitive.Trigger className={classNames.trigger} {...rest}>
      {children}
    </TabsPrimitive.Trigger>
  )
}

TabsTrigger.displayName = 'TabsTrigger'

type TabsContentProps = ComponentPropsWithRef<typeof TabsPrimitive.Content>

export const TabsContent = ({ className, children, ...rest }: TabsContentProps) => {
  const classNames = {
    content: clsx(s.content, className),
  }
  return (
    <TabsPrimitive.Content className={classNames.content} {...rest}>
      {children}
    </TabsPrimitive.Content>
  )
}

TabsContent.displayName = 'TabsContent'
