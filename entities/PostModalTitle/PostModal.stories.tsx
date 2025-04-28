import type { Meta, StoryObj } from '@storybook/react'
import { PostModalTitle } from '@/entities/PostModalTitle/PostModalTitle'
import photo from './../../public/proj1.webp'

const meta = {
  component: PostModalTitle,
  tags: ['autodocs'],
  title: 'Components/PostModalTitle',
} satisfies Meta<typeof PostModalTitle>

export default meta
type Story = StoryObj<typeof PostModalTitle>

export const PostModalTitleStory: Story = {
  args: {
    author: 'john',
    postAuthorSrc: photo,
    postAuthorAlt: 'user photo',
    postAuthorHref: '#',
  },
}
