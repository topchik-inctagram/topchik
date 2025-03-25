import type { Meta, StoryObj } from '@storybook/react'
import { Button, Toast } from '@/shared/components'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

export const ToastDefault: Story = {}
