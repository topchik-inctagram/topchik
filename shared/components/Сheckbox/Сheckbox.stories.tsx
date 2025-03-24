import { Meta, StoryObj } from '@storybook/react'
import { Сheckbox } from './Сheckbox'
import { useState } from 'react'

const meta = {
  component: Сheckbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Сheckbox>

export default meta
type Story = StoryObj<typeof meta>
export const Uncontrolled: Story = {
  args: {
    disabled: false,
    label: 'Click here',
  },
}

export const Controlled: Story = {
  render: args => {
    const [checked, setChecked] = useState(false)

    return (
      <Сheckbox
        {...args}
        cheked={checked}
        label={'Click here'}
        onChange={() => setChecked(!checked)}
      />
    )
  },
}
