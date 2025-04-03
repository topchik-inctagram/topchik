import { CreateNewPassword, SignIn } from '@/shared/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: CreateNewPassword,
  tags: ['autodocs'],
  title: 'Components/CreateNewPassword',
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof CreateNewPassword>

export const CreateNewPasswordForm: Story = {
  render: () => {
    const callback = (data: any) => console.log(data)

    return <CreateNewPassword onSubmit={callback} />
  },
}
