import { type Meta, type StoryObj } from '@storybook/react'
import { Dropdown, DropdownArrow, DropdownItem, DropdownLabel, DropdownSeparator } from './'
import { NotificationItem } from './dropDownItems/notificationItem/NotificationItem'
import { NotificationBell } from './dropDownItems/notificationItem/notificationBell/NotificationBell'
import {
  ActionDropdownDots,
  ActionDropdownItem,
} from './dropDownItems/actionDropdownItem/ActionDropdownItem'
import { Edit2Outline, TrashOutline } from '@/public'
import { ScrollArea } from '@/shared/components'

const meta = {
  component: Dropdown,
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownMenuForActions: Story = {
  args: {
    trigger: <ActionDropdownDots />,
  },
  render: args => {
    return (
      <div style={{ marginLeft: '150px' }}>
        <Dropdown {...args} style={{ padding: '6px 12px' }}>
          <DropdownItem style={{ padding: '0' }}>
            <ActionDropdownItem icon={<Edit2Outline />} text="Edit Post" />
          </DropdownItem>
          <DropdownItem style={{ padding: '0' }}>
            <ActionDropdownItem icon={<TrashOutline />} text="Delete Post" />
          </DropdownItem>
        </Dropdown>
      </div>
    )
  },
}

export const DropdownMenuForNotifications: Story = {
  args: {
    trigger: <NotificationBell count={3} />,
  },
  render: args => {
    return (
      <div style={{ marginLeft: '320px' }}>
        <Dropdown {...args} style={{ height: '440px' }}>
          <DropdownLabel>Уведомления</DropdownLabel>
          <DropdownSeparator style={{ marginRight: '10px' }} />
          <ScrollArea>
            <DropdownItem style={{ marginRight: '10px' }}>
              <NotificationItem
                date="1 день назад"
                message="Следующий платеж у вас спишется через 1 день"
                tag="Новое"
                title="Новое уведомление!"
              />
            </DropdownItem>

            <DropdownSeparator style={{ marginRight: '10px' }} />
            <DropdownItem style={{ marginRight: '10px' }}>
              <NotificationItem
                date="1 день назад"
                message="Ваша подписка истекает через 7 дней"
                tag="Новое"
                title="Новое уведомление!"
              />
            </DropdownItem>
            <DropdownSeparator style={{ marginRight: '10px' }} />
            <DropdownItem style={{ marginRight: '10px' }}>
              <NotificationItem
                date="1 день назад"
                message="Ваша подписка истекает через 7 дней"
                tag="Новое"
                title="Новое уведомление!"
              />
            </DropdownItem>
            <DropdownSeparator style={{ marginRight: '10px' }} />
            <DropdownItem style={{ marginRight: '10px' }}>
              <NotificationItem
                date="1 день назад"
                message="Ваша подписка истекает через 7 дней"
                tag="Новое"
                title="Новое уведомление!"
              />
            </DropdownItem>
            <DropdownSeparator style={{ marginRight: '10px' }} />
            <DropdownItem style={{ marginRight: '10px' }}>
              <NotificationItem
                date="1 день назад"
                message="Ваша подписка истекает через 7 дней"
                tag="Новое"
                title="Новое уведомление!"
              />
            </DropdownItem>
            <DropdownSeparator style={{ marginRight: '10px' }} />
            <DropdownItem style={{ marginRight: '10px' }}>
              <NotificationItem
                date="1 день назад"
                message="Ваша подписка истекает через 7 дней"
                tag="Новое"
                title="Новое уведомление!"
              />
            </DropdownItem>
          </ScrollArea>
          <DropdownArrow />
        </Dropdown>
      </div>
    )
  },
}
