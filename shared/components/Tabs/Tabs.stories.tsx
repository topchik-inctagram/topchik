import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    items: [
      { value: 'default', label: 'Default' },
      { value: 'active', label: 'Active' },
      { value: 'hover', label: 'Hover' },
      { value: 'focus', label: 'Focus' },
      { value: 'disabled', label: 'Disabled', disabled: true }
    ],
    defaultValue: 'active'
  },
  argTypes: {
    variant: {
      options: ['default', 'outline'],
      control: { type: 'radio' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    backgrounds: { default: 'dark' },
    pseudo: {
      hover: ['hover'],
      focus: ['focus']
    }
  }
}

export default meta

type Story = StoryObj<typeof Tabs>

export const DefaultVariant: Story = {
  args: {
    variant: 'default'
  }
}

export const OutlineVariant: Story = {
  args: {
    variant: 'outline'
  }
}