import { type Meta, type StoryObj } from '@storybook/react'
import { SingIn } from '@/shared/components'

const meta = {
  component: SingIn,
  tags: ['autodocs'],
  title: 'Components/SignIn',
} satisfies Meta<typeof SingIn>

export default meta
type Story = StoryObj<typeof meta>

export const SignInForm: Story = {}
