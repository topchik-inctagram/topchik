import type { Meta, StoryObj } from '@storybook/react'
import { EmailSentModal } from '@/entities/EmailSentModal'

const meta = {
  component: EmailSentModal,
  tags: ['autodocs'],
  title: 'Components/EmailSentModal',
} satisfies Meta<typeof EmailSentModal>

export default meta
type Story = StoryObj<typeof EmailSentModal>

export const EmailSentModalStory: Story = {
  args: {
    email: 'test@test.com',
  },
}
