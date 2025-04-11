import type { Meta, StoryObj } from '@storybook/react'
import { UserPhoto } from '@/entities/UserPhoto'
import photo from '@/public/proj1.webp'

const meta = {
  component: UserPhoto,
  tags: ['autodocs'],
  title: 'Components/UserPhoto',
} satisfies Meta<typeof UserPhoto>

export default meta
type Story = StoryObj<typeof UserPhoto>

export const UserPhotoStory: Story = {
  args: {
    src: photo,
    alt: 'user photo',
  },
}
