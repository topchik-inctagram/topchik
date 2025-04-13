import { type Meta, type StoryObj } from '@storybook/react'
import { Checkbox } from '@/shared/components'
import { useState } from 'react'

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/UI/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Uncontrolled: Story = {
  args: {
    disabled: false,
    label: 'Check-box',
  },
}

export const Controlled: Story = {
  args: {
    disabled: false,
  },
  render: args => {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>(false)

    return (
      <Checkbox
        {...args}
        checked={checked}
        onCheckedChange={checked => {
          setChecked(checked)
        }}
        label={'Click here'}
      />
    )
  },
}
