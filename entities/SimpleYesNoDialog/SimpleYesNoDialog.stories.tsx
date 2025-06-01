import type { Meta, StoryObj } from '@storybook/react'
import { SimpleYesNoDialog } from './SimpleYesNoDialog'

const meta = {
  title: 'Components/SimpleYesNoDialog',
  component: SimpleYesNoDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof SimpleYesNoDialog>

export default meta
type Story = StoryObj<typeof SimpleYesNoDialog>

export const Logout: Story = {
  args: {
    open: true,
    title: 'Log Out',
    description: 'Are you really want to log out of your account "_boldText_"?',
    boldText: 'Epam@epam.com',
    onConfirm: () => alert('Logged out'),
    onCancel: () => alert('Canceled'),
  },
}

export const DeleteAvatar: Story = {
  args: {
    open: true,
    title: 'Delete Photo',
    description: 'Are you sure you want to delete the photo?',
    onConfirm: () => alert('Avatar deleted'),
    onCancel: () => alert('Canceled'),
  },
}
