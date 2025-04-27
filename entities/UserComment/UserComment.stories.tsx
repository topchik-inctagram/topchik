import type { Meta, StoryObj } from '@storybook/react'
import { UserComment } from '@/entities/UserComment'

const meta = {
  component: UserComment,
  tags: ['autodocs'],
  title: 'Components/UserComment',
} satisfies Meta<typeof UserComment>

export default meta
type Story = StoryObj<typeof UserComment>

export const UserCommentStory: Story = {
  args: {
    created: '22m ago',
    author: 'John',
    href: '#',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  render: args => {
    return (
      <div style={{ backgroundColor: 'darkblue', width: 'fit-content' }}>
        <UserComment {...args} />
      </div>
    )
  },
}
