import { EmailSentModal } from '@/entities/EmailSentModal'
import type { Meta, StoryObj } from '@storybook/react'
import { LogoutModal } from '@/entities/LogoutModal/LogoutModal'

const meta = {
  component: LogoutModal,
  tags: ['autodocs'],
  title: 'Components/LogoutModal',
} satisfies Meta<typeof LogoutModal>

export default meta
type Story = StoryObj<typeof LogoutModal>

export const LogoutModalStory: Story = {
  args: {
    open: true,
  },
}
