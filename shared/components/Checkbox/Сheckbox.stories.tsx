import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from './Checkbox'

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/UI/Checkbox',
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

export const Default: Story = {
  args: {
    label: 'Check-Box',
    checked: true,
  },
}

export const RecaptchaMode: Story = {
  args: {
    label: 'I’m not a robot',
    checked: false,
    recaptchaMode: true,
  },
  render: args => {
    const [loading, setLoading] = useState(false)
    const [verified, setVerified] = useState(false)

    const handleChange = async (checked: boolean) => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 2000))
      setLoading(false)
      setVerified(true)
      return true
    }

    return (
      <Checkbox {...args} checked={verified} disabled={loading} onCheckedChange={handleChange} />
    )
  },
}
