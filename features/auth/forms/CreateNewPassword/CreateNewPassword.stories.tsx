import type { Meta, StoryObj } from '@storybook/react'
import { CreateNewPassword } from '@/features/auth/forms/CreateNewPassword/index'

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

    return <CreateNewPassword isLoading={false} onSubmit={callback} />
  },
}
