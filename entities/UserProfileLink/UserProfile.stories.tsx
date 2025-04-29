import type { Meta, StoryObj } from '@storybook/react'
import { UserProfileLink } from '@/entities/UserProfileLink'

const meta = {
  component: UserProfileLink,
  tags: ['autodocs'],
  title: 'Components/UserProfileLink',
} satisfies Meta<typeof UserProfileLink>

export default meta
type Story = StoryObj<typeof UserProfileLink>

export const UserProfileLinkStory: Story = {
  args: {
    href: '#',
    userName: 'John',
  },
}
