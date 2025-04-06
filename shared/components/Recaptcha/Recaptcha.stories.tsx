import { Meta, StoryObj } from '@storybook/react'
import { Recaptcha } from './Recaptcha'
import { useState } from 'react'

const meta = {
  component: Recaptcha,
  tags: ['autodocs'],
  title: 'Components/Recaptcha',
} satisfies Meta<typeof Recaptcha>

export default meta
type Story = StoryObj<typeof meta>
export const Uncontrolled: Story = {
  args: {
    label: 'Click here',
  },
}

export const Controlled: Story = {
  render: args => {
    const [checked, setChecked] = useState(false)

    return <Recaptcha {...args} label={'Click here'} />
  },
}
