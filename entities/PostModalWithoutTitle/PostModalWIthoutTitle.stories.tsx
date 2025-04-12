import type { Meta, StoryObj } from '@storybook/react'
import { PostModalWithoutTitle } from '@/entities/PostModalWithoutTitle/PostModalWithoutTitle'
import { Modal } from '@/shared/components'
import { UserPhoto } from '@/entities/UserPhoto'
import foto from '@/public/proj1.webp'
import { UserProfileLink } from '@/entities/UserProfileLink'

const meta = {
  component: PostModalWithoutTitle,
  tags: ['autodocs'],
  title: 'Components/PostModalWithoutTitle',
} satisfies Meta<typeof PostModalWithoutTitle>

export default meta
type Story = StoryObj<typeof PostModalWithoutTitle>

const ModalWithControls = (args: any) => {
  return (
    <Modal
      {...args}
      open
      withPhoto
      className="modal-header-override"
      photoContent={[foto, foto, foto]}
      style={{ overflow: 'visible' }}
      title={args?.title || 'Заголовок модалки'}
    >
      <div>
        <div style={{ padding: '20px' }}>
          <p>Содержимое модального окна</p>
        </div>
      </div>
    </Modal>
  )
}
export const PostModalWithoutTitleStory: Story = {
  render: args => <ModalWithControls {...args} size="sm" />,
  args: {
    title: (
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <UserPhoto alt="sr" src={foto} />
        <UserProfileLink href="#" userName="J SMITH" />
      </div>
    ),
  },
}
