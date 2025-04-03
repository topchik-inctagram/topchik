import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from '@/shared/components'

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/UI/Checkbox',
  args: {
    label: 'Checkbox',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable checkbox interaction',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    onCheckedChange: {
      action: 'checked',
      description: 'Callback when checked state changes',
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const Unchecked: Story = {
  args: {
    checked: false,
  },
}

export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate',
  },
}

export const Controlled: Story = {
  render: () => {
    return <CheckboxWrapper />
  },
}

function CheckboxWrapper() {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox checked={checked} label="Controlled" onCheckedChange={() => setChecked(!checked)} />
  )
}
