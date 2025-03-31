import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from '@/shared/components'

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof Sidebar>

export const SidebarStory: Story = {}
