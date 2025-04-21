import { type Meta, type StoryObj } from '@storybook/react'
import { CaptchaSpinner } from './CaptchaSpinner'


const meta = {
  component: CaptchaSpinner,
  tags: ['autodocs'],
  title: 'Components/UI/CaptchaSpinner',
  args: {
  },
} satisfies Meta<typeof CaptchaSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}


