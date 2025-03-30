import * as TabsPrimitive from '@radix-ui/react-tabs'
import s from './Tabs.module.scss'

export const Tabs = ({
  className = '',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) => (
  <TabsPrimitive.Root className={`${s.tabsRoot} ${className}`.trim()} {...props} />
)

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> & {
  variant?: 'default' | 'outline'
  fullWidth?: boolean
}

export const TabsList = ({
  variant = 'default',
  fullWidth = false,
  className = '',
  ...props
}: TabsListProps) => {
  const listClasses = [
    s.tabsList,
    variant === 'outline' ? s.outlineVariant : '',
    fullWidth ? s.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <TabsPrimitive.List className={listClasses} {...props} />
}

type TabProps = React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  variant?: 'default' | 'outline'
}

export const Tab = ({ variant = 'default', className = '', ...props }: TabProps) => {
  const tabClasses = [s.tab, variant === 'outline' ? s.outlineTab : '', className]
    .filter(Boolean)
    .join(' ')

  return <TabsPrimitive.Trigger className={tabClasses} {...props} />
}

export const TabsContent = ({
  className = '',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content className={`${s.tabContent} ${className}`.trim()} {...props} />
)