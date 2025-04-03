import { type Meta, type StoryObj } from '@storybook/react'
import { SignIn } from '@/shared/components'

const meta = {
  component: SignIn,
  tags: ['autodocs'],
  title: 'Components/SignIn',
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof SignIn>

export const SignInForm: Story = {
  render: () => {
    const callback = (data: any) => console.log(data)

    return <SignIn onSubmit={callback} />
  },
}
