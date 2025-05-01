import type { Meta, StoryObj } from '@storybook/react'
import { SuccessPaymentModal } from '@/entities/accountManagementModals'

const meta = {
  component: SuccessPaymentModal,
  tags: ['autodocs'],
  title: 'Components/SuccessPaymentModal',
} satisfies Meta<typeof SuccessPaymentModal>

export default meta
type Story = StoryObj<typeof SuccessPaymentModal>

export const SuccessPaymentModalStory: Story = {
  render: () => <SuccessPaymentModal onClose={() => {}} />,
}
