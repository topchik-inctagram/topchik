import * as TabsPrimitive from '@radix-ui/react-tabs'
import { clsx } from 'clsx'
import { forwardRef } from 'react'
import s from './Tabs.module.scss'

type TabItem = {
    value: string
    label: string
    disabled?: boolean
    content?: React.ReactNode
}

type TabsVariant = 'default' | 'outline'

type TabsProps = {
    items: TabItem[]
    variant?: TabsVariant
    defaultValue?: string
    className?: string
    fullWidth?: boolean
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
    ({ items, variant = 'default', defaultValue, className, fullWidth, ...props }, ref) => {
        return (
            <TabsPrimitive.Root
                className={clsx(s.tabsRoot, className)}
                defaultValue={defaultValue}
                ref={ref}
                {...props}
            >
                <TabsPrimitive.List
                    className={clsx(s.tabsList, {
                        [s.outlineVariant]: variant === 'outline',
                        [s.fullWidth]: fullWidth,
                    })}
                >
                    {items.map((item) => (
                        <TabsPrimitive.Trigger
                            key={item.value}
                            value={item.value}
                            className={clsx(s.tab, {
                                [s.outlineTab]: variant === 'outline',
                                [s.disabled]: item.disabled,
                            })}
                            disabled={item.disabled}
                        >
                            {item.label}
                        </TabsPrimitive.Trigger>
                    ))}
                </TabsPrimitive.List>

                {items.map((item) => (
                    <TabsPrimitive.Content
                        key={item.value}
                        value={item.value}
                        className={s.tabContent}
                    >
                        {item.content || `${item.label} content`}
                    </TabsPrimitive.Content>
                ))}
            </TabsPrimitive.Root>
        )
    }
)

Tabs.displayName = 'Tabs'