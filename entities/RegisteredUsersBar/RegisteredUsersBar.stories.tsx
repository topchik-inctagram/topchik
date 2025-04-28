import type { Meta, StoryObj } from '@storybook/react'
import { RegisteredUsersBar } from '@/entities/RegisteredUsersBar/RegisteredUsersBar'

const meta = {
  component: RegisteredUsersBar,
  tags: ['autodocs'],
  title: 'Components/RegisteredUsersBar',
} satisfies Meta<typeof RegisteredUsersBar>

export default meta
type Story = StoryObj<typeof RegisteredUsersBar>

export const RegisteredUsersBarStory: Story = {
  args: {
    usersCount: 304,
  },
}
