import { SignUp } from '@/shared/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: SignUp,
  tags: ['autodocs'],
  title: 'Components/SignUp',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof SignUp>

export const SignInForm: Story = {
  render: () => {
    const callback = (data: any) => console.log(data)

    return <SignUp onSubmit={callback} />
  },
}
