import { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Сheckbox'
import { useState } from 'react'

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>
export const Uncontrolled: Story = {
  args: {
    disabled: false,
    label: 'Check - box',
  },
}

export const Controlled: Story = {
  render: args => {
    const [checked, setChecked] = useState(false)

    return (
      <Checkbox
        {...args}
        checked={checked}
        label={'Check - box'}
        onChange={() => setChecked(!checked)}
      />
    )
  },
}
