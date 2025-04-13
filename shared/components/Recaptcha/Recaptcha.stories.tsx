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

export const Controlled: Story = {
  render: args => {
    const [status, setStatus] = useState<
      'idle' | 'pending' | 'verified' | 'error' | 'expired' | 'notVerified'
    >('idle')

    const handleVerify = () => {
      setStatus('pending')
      setTimeout(() => {
        const random = Math.random()
        if (random > 0.7) {
          setStatus('verified')
        } else if (random > 0.4) {
          setStatus('notVerified')
        } else if (random > 0.2) {
          setStatus('expired')
        }
      }, 2000)
    }

    return (
      <Recaptcha {...args} label={'I’m not a robot'} isStatus={status} onVerify={handleVerify} />
    )
  },
}

export const Pending: Story = {
  args: {
    label: 'I’m not a robot',
    isStatus: 'pending',
  },
}

export const Expired: Story = {
  args: {
    label: 'I’m not a robot',
    isStatus: 'expired',
  },
}

export const NotVerified: Story = {
  args: {
    label: 'I’m not a robot',
    isStatus: 'notVerified',
  },
}
