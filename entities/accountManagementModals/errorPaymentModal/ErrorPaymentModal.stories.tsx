import type { Meta, StoryObj } from '@storybook/react'
import { ErrorPaymentModal } from '@/entities/accountManagementModals'

const meta = {
  component: ErrorPaymentModal,
  tags: ['autodocs'],
  title: 'Components/ErrorPaymentModal',
} satisfies Meta<typeof ErrorPaymentModal>

export default meta
type Story = StoryObj<typeof ErrorPaymentModal>

export const ErrorPaymentModalStory: Story = {
  render: () => <ErrorPaymentModal onClose={() => {}} />,
}
