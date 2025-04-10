import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from '@/shared/components'

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/UI/Checkbox',
  args: {
    label: 'Check-box',
    disabled: false,
    checked: false,
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
    isRecaptcha: {
      control: 'boolean',
      description: 'Enable reCAPTCHA functionality',
    },
    onRecaptchaComplete: {
      action: 'recaptcha-complete',
      description: 'Callback when reCAPTCHA is verified',
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Checked: Story = {
  args: {
    checked: false,
  },
}

const RecaptchaCheckbox = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      isRecaptcha
      checked={checked}
      label="reCAPTCHA"
      onCheckedChange={() => setChecked(!checked)}
      onRecaptchaComplete={() => console.log('reCAPTCHA verified')}
    />
  )
}

export const WithRecaptcha: Story = {
  render: () => <RecaptchaCheckbox />,
}
