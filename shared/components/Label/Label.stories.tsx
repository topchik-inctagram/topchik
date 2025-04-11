import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '@/shared/components'

const meta = {
  component: Label,
  tags: ['autodocs'],
  title: 'Components/UI/Label',
  args: { children: 'Hello' },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof Label>
export const LabelStory: Story = {}

export const DisabledLabelStory: Story = {
  args: {
    disabled: true,
  },
}
