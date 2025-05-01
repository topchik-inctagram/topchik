import type { Meta, StoryObj } from '@storybook/react'
import { CreatePaymentModal } from '@/entities/accountManagementModals'

const meta = {
  component: CreatePaymentModal,
  tags: ['autodocs'],
  title: 'Components/CreatePaymentModal',
} satisfies Meta<typeof CreatePaymentModal>

export default meta
type Story = StoryObj<typeof CreatePaymentModal>

export const CreatePaymentModalStory: Story = {
  render: () => <CreatePaymentModal onClose={() => {}} />,
}
