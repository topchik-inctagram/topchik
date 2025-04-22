import type { Meta, StoryObj } from '@storybook/react'
import { PostLikesAndShareBar } from '@/entities/PostLikesAndShareBar/PostLikesAndShareBar'

const meta = {
  component: PostLikesAndShareBar,
  tags: ['autodocs'],
  title: 'Components/PostLikesAndShareBar',
} satisfies Meta<typeof PostLikesAndShareBar>

export default meta
type Story = StoryObj<typeof PostLikesAndShareBar>

export const PostLikesAndShareBarStory: Story = {}
