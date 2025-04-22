import type { Meta, StoryObj } from '@storybook/react'
import { PostModal } from '@/features/PostModal'
import photo from './../../public/proj1.webp'
import photo2 from '@/public/vercel.svg'

const meta = {
  title: 'Components/PostModal',
  component: PostModal,
  tags: ['autodocs'],
} satisfies Meta<typeof PostModal>

export default meta

type Story = StoryObj<typeof PostModal>

const blankComment = {
  alt: 'user photo',
  src: photo,
  author: 'John',
  comment: 'nice to see you , bro qweqwe qwe qekjsd kaj ioqweoi ajdo ajioqwe asd adkj kl',
  href: '#',
  created: '2 hours ago',
}

export const PostModalStory: Story = {
  args: {
    postAuthorHref: '#',
    postAuthorSrc: photo,
    likeAuthorImage: photo,
    author: 'john',
    postAuthorAlt: 'author photo',
    likesCount: 300,
    postCreateDate: '21 july 2021',
    photoContent: [photo, photo, photo],
    comments: [blankComment, blankComment, blankComment, blankComment, blankComment, blankComment],
  },
}
