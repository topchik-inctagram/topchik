import * as TabsPrimitive from '@radix-ui/react-tabs'
import s from './Tabs.module.scss'
import clsx from 'clsx'
import { ComponentPropsWithRef } from 'react'
import * as Label from '@radix-ui/react-label'
import { Typography } from '../Typography'

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
      {label && (
        <Label.Root asChild className={classNames.label}>
          <Typography as={'label'} variant={'regular_16'}>
            {label}
          </Typography>
        </Label.Root>
      )}
      {children}
    </TabsPrimitive.Root>
  )
}

TabsRoot.displayName = 'TabsRoot'

type ListProps = TabsPrimitive.TabsListProps

export const TabsList = ({ className, children, ...rest }: ListProps) => {
  const classNames = {
    list: clsx(s.list),
  }

  return (
    <TabsPrimitive.List className={classNames.list} {...rest}>
      {children}
    </TabsPrimitive.List>
  )
}

TabsList.displayName = 'TabsList'

type TabsProps = ComponentPropsWithRef<typeof TabsPrimitive.Trigger>

export const TabsTrigger = ({ children, className, ref, value, ...rest }: TabsProps) => {
  const classNames = {
    trigger: s.trigger,
  }

  return (
    <TabsPrimitive.Trigger asChild value={value} className={classNames.trigger} {...rest}>
      <Typography as={'button'} variant={'h3'}>
        {children}
      </Typography>
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
    content: (s.content, className),
  }
  return (
    <TabsPrimitive.Content className={classNames.content} value={value} {...rest}>
      {children}
    </TabsPrimitive.Content>
  )
}

TabsContent.displayName = 'TabsContent'
