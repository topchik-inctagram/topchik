import { Meta, StoryObj } from '@storybook/react'
import { Dropdown, DropdownArrow, DropdownItem, DropdownLabel, DropdownSeparator } from './'
import { NotificationItem } from './dropDownItems/notificationItem/NotificationItem'
import { NotificationBell } from './dropDownItems/notificationItem/notificationBell/NotificationBell'
import {
  ActionDropdownDots,
  ActionDropdownItem,
} from './dropDownItems/actionDropdownItem/ActionDropdownItem'
import { Edit2Outline, TrashOutline } from '@/public'

const meta = {
  component: Dropdown,
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownMenuForActions: Story = {
  args: {
    trigger: (
      <button>
        <ActionDropdownDots />
      </button>
    ),
  },
  render: args => {
    return (
      <div style={{ marginLeft: '150px' }}>
        <Dropdown {...args}>
          <DropdownItem>
            <ActionDropdownItem icon={<Edit2Outline />} label="Edit Post" />
          </DropdownItem>
          <DropdownItem>
            <ActionDropdownItem icon={<TrashOutline />} label="Delete Post" />
          </DropdownItem>
        </Dropdown>
      </div>
    )
  },
}

export const DropdownMenuForNotifications: Story = {
  args: {
    trigger: (
      <button>
        <NotificationBell count={3} />
      </button>
    ),
  },
  render: args => {
    return (
      <div style={{ marginLeft: '300px' }}>
        <Dropdown {...args}>
          <div style={{ maxHeight: '410px', overflowY: 'auto' }}>
            <DropdownLabel>Уведомления</DropdownLabel>
            <DropdownSeparator />
            <DropdownItem>
              <NotificationItem
                title="Новое уведомление!"
                tag="Новое"
                message="Следующий платеж у вас спишется через 1 день"
                date="1 день назад"
              />
            </DropdownItem>

            <DropdownSeparator />
            <DropdownItem>
              <NotificationItem
                title="Новое уведомление!"
                tag="Новое"
                message="Ваша подписка истекает через 7 дней"
                date="1 день назад"
              />
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem>
              <NotificationItem
                title="Новое уведомление!"
                tag="Новое"
                message="Ваша подписка истекает через 7 дней"
                date="1 день назад"
              />
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem>
              <NotificationItem
                title="Новое уведомление!"
                tag="Новое"
                message="Ваша подписка истекает через 7 дней"
                date="1 день назад"
              />
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem>
              <NotificationItem
                title="Новое уведомление!"
                tag="Новое"
                message="Ваша подписка истекает через 7 дней"
                date="1 день назад"
              />
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem>
              <NotificationItem
                title="Новое уведомление!"
                tag="Новое"
                message="Ваша подписка истекает через 7 дней"
                date="1 день назад"
              />
            </DropdownItem>
          </div>
          <DropdownArrow />
        </Dropdown>
      </div>
    )
  },
}
