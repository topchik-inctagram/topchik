import type { Meta, StoryObj } from '@storybook/react'
import { PostCard } from '@/entities/PostCard'

const meta = {
  component: PostCard,
  tags: ['autodocs'],
  title: 'Components/PostCard',
} satisfies Meta<typeof PostCard>

export default meta
type Story = StoryObj<typeof meta>

export const PostCardStory: Story = {}
