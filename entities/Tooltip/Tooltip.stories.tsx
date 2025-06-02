import { type Meta, type StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'

const meta = {
  component: Tooltip,
  tags: ['autodocs'],
  title: 'Components/Tooltip',
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    onClose: () => console.log('modal closed'),
    isAuth: true,
    placeholder: 'Upload an image',
  },
}
