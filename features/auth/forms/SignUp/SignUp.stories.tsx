import type { Meta, StoryObj } from '@storybook/react'
import { SignUp } from '@/features/auth/forms/SignUp/index'

const meta = {
  component: SignUp,
  tags: ['autodocs'],
  title: 'Components/SignUp',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof SignUp>

export const SignUpForm: Story = {
  render: () => {
    const callback = (data: any) => console.log(data)

    return <SignUp onSubmit={callback} />
  },
}
