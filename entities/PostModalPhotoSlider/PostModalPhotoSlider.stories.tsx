import type { Meta, StoryObj } from '@storybook/react'

import photo from './../../public/proj1.webp'
import { PostModalPhotoSlider } from '@/entities/PostModalPhotoSlider'

const meta = {
  title: 'Components/PostModalPhotoSlider',
  component: PostModalPhotoSlider,
  tags: ['autodocs'],
} satisfies Meta<typeof PostModalPhotoSlider>

export default meta

type Story = StoryObj<typeof PostModalPhotoSlider>

export const PrimaryStory: Story = {
  args: {
    photoContent: [photo, photo, photo, photo, photo],
  },
  render: args => {
    return (
      <div style={{ width: '500px', height: '600px' }}>
        <PostModalPhotoSlider {...args} />
      </div>
    )
  },
}
