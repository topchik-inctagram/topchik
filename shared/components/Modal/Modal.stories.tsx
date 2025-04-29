import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import './Modal.module.scss'
import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Components/UI/ModalRadix',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    open: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

const ModalWithControls = (args: Story['args']) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Открыть модалку</Button>
      <Modal
        {...args}
        className="modal-header-override"
        open={isOpen}
        title={args?.title || 'Заголовок модалки'}
        onOpenChange={() => setIsOpen(false)}
      >
        <div style={{ padding: '20px' }}>
          <p>Содержимое модального окна</p>
          <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
        </div>
      </Modal>
    </>
  )
}
export const SmallModal: Story = {
  render: args => <ModalWithControls {...args} size="sm" />,
  args: {
    title: 'Малая модалка',
  },
}

export const MediumModal: Story = {
  render: args => <ModalWithControls {...args} size="md" />,
  args: {
    title: 'Средняя модалка',
  },
}

export const LargeModal: Story = {
  render: args => <ModalWithControls {...args} size="lg" />,
  args: {
    title: 'Большая модалка',
    children: (
      <div style={{ padding: '20px' }}>
        <h3>Дополнительный контент</h3>
        <p>Здесь может быть форма или другой сложный контент</p>
      </div>
    ),
  },
}

export const ControlledModal: Story = {
  args: {
    open: true,
    title: 'Контролируемая модалка',
    children: <div style={{ padding: '20px' }}>Управляется через Storybook controls</div>,
  },
}
