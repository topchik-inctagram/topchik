import { type Meta, type StoryObj } from '@storybook/react'
import { SignInForm } from '@/features/auth/forms/SignInForm'

const meta = {
  component: SignInForm,
  tags: ['autodocs'],
  title: 'Components/SignInForm',
} satisfies Meta<typeof SignInForm>

export default meta
type Story = StoryObj<typeof SignInForm>

export const SignInFormStory: Story = {
  render: () => {
    const callback = (data: any) => console.log(data)

    return <SignInForm onSubmit={callback} />
  },
}
