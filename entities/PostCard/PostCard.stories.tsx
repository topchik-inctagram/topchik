import type { Meta, StoryObj } from '@storybook/react'
import { PostCard } from '@/entities/PostCard'
import foto from '@/public/proj1.webp'

const meta = {
  component: PostCard,
  tags: ['autodocs'],
  title: 'Components/PostCard',
} satisfies Meta<typeof PostCard>

export default meta
type Story = StoryObj<typeof PostCard>

export const PostCardStory: Story = {
  args: {
    postText:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet blanditiis dolore earum, error facilis impeditinventore ipsamagni natusnesciunt nobisomnis praesentiumsapiente sequitotam undeverovoluptates.Accusantium,ad corporisdolores doloribuseaque inventorelibero nostrumporro. A,animi culpacum cumque,dolordolore eaqueeius eumharum laborumlaudantium molestiasnam nonperferendis placeatquidem voluptate!Aut beataeconsequuntur dictadignissimos error,expedita fugafugiat idillo ipsammagnam namnecessitatibus nisinon nullanumquam optioquam quasiquia quibusdamquidem quossed suntullam velit.',
    postTitle: 'HOW TO START',
    postImage: foto,
    authorImage: foto,
    postCreated: '22 min ago',
  },
}

export const PostCardWithSliderStory: Story = {
  args: {
    postText:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet blanditiis dolore earum, error facilis impeditinventore ipsamagni natusnesciunt nobisomnis praesentiumsapiente sequitotam undeverovoluptates.Accusantium,ad corporisdolores doloribuseaque inventorelibero nostrumporro. A,animi culpacum cumque,dolordolore eaqueeius eumharum laborumlaudantium molestiasnam nonperferendis placeatquidem voluptate!Aut beataeconsequuntur dictadignissimos error,expedita fugafugiat idillo ipsammagnam namnecessitatibus nisinon nullanumquam optioquam quasiquia quibusdamquidem quossed suntullam velit.',
    postTitle: 'HOW TO START',
    postImage: [foto, foto, foto, foto],
    authorImage: foto,
    postCreated: '22 min ago',
  },
}
