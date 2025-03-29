import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ModalRadix } from './ModalRadix'
import { Button } from '../Button'
import './ModalRadix.module.scss' // Создадим этот файл ниже

const meta: Meta<typeof ModalRadix> = {
  title: 'Components/UI/ModalRadix',
  component: ModalRadix,
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
  parameters: {
    // Глобальное переопределение стилей
    styles: `
      .modal-header-override {
        padding: 12px 24px !important;
      }
    `,
  },
}

export default meta
type Story = StoryObj<typeof ModalRadix>

// Компонент-обертка с контролем состояния
const ModalWithControls = (args: Story['args']) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Открыть модалку</Button>
      <ModalRadix
        {...args}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={args?.title || 'Заголовок модалки'}
        className="modal-header-override" // Применяем наш класс
      >
        <div style={{ padding: '20px' }}>
          <p>Содержимое модального окна</p>
          <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
        </div>
      </ModalRadix>
    </>
  )
}

// Основные истории
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
