import type { Meta, StoryObj } from '@storybook/react'
import { ConfirmModal } from './ConfirmModal'

const meta = {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmModal>

export default meta
type Story = StoryObj<typeof ConfirmModal>

export const Logout: Story = {
  args: {
    open: true,
    title: 'Log Out',
    description: 'Are you really want to log out of your account “Epam@epam.com”?',
    onConfirm: () => alert('Logged out'),
    onCancel: () => alert('Canceled'),
  },
}

export const DeleteAvatar: Story = {
  args: {
    open: true,
    title: 'Delete Avatar',
    description: 'Are you sure you want to delete the photo?',
    onConfirm: () => alert('Avatar deleted'),
    onCancel: () => alert('Canceled'),
  },
}
