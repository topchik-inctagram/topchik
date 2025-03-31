import { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from './'

const meta = {
  component: Dropdown,
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownMenu: Story = {
  args: {
    trigger: <button>+</button>,
    children: 'Hello',
  },
  render: args => {
    return (
      <div>
        <Dropdown {...args} />
      </div>
    )
  },
}
