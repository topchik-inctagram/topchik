import { type Meta, type StoryObj } from '@storybook/react'
import { Tootlip } from './Tootlip'

const meta = {
  component: Tootlip,
  tags: ['autodocs'],
  title: 'Components/Tooltip',
} satisfies Meta<typeof Tootlip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => console.log('modal open changed'),
    isAuth: true,
    placeholder: 'Upload an image',
  },
}
