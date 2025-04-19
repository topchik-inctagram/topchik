import { type Meta, type StoryObj } from '@storybook/react'
import { Tootlip } from './Tootlip'

const meta = {
  component: Tootlip,
  tags: ['autodocs'],
  title: 'Components/entities/Tootlip',
} satisfies Meta<typeof Tootlip>

export default meta
type Story = StoryObj<typeof meta>
