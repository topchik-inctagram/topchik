import type { Meta, StoryObj } from '@storybook/react'
import { UserSmallPhoto } from '@/entities/UserSmallPhoto'
import photo from '@/public/proj1.webp'

const meta = {
  component: UserSmallPhoto,
  tags: ['autodocs'],
  title: 'Components/UserSmallPhoto',
} satisfies Meta<typeof UserSmallPhoto>

export default meta
type Story = StoryObj<typeof UserSmallPhoto>

export const UserSmallPhotoStory: Story = {
  args: {
    src: photo,
    alt: 'user photo',
  },
}
