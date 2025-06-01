import type { Meta, StoryObj } from '@storybook/react'
import AccountManagement from '@/features/accountManagement/AccountManagement'

const meta = {
  component: AccountManagement,
  tags: ['autodocs'],
  title: 'Features/AccountManagement',
} satisfies Meta<typeof AccountManagement>

export default meta
type Story = StoryObj<typeof AccountManagement>

export const AccountManagementStory: Story = {
  render: () => <AccountManagement paymentCompleted setPaymentCompleted={() => {}} />,
}
