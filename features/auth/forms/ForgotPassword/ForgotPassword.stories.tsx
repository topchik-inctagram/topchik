import type { Meta, StoryObj } from '@storybook/react'
import { ForgotPassword } from '@/features/auth/forms/ForgotPassword/index'

const meta = {
  component: ForgotPassword,
  tags: ['autodocs'],
  title: 'Components/ForgotPassword',
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof ForgotPassword>

// export const ForgotPasswordNotVerifiedForm: Story = {
//   render: () => {
//     const callback = (data: any) => console.log(data)
//
//     return <ForgotPassword isVerified={false} onSubmit={callback} />
//   },
// }
//
// export const ForgotPasswordVerifiedForm: Story = {
//   render: () => {
//     const callback = (data: any) => console.log(data)
//
//     return <ForgotPassword isVerified onSubmit={callback} />
//   },
// }
