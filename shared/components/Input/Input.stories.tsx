import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
}

export const Password: Story = {
  args: {
    label: 'Label',
    placeholder: 'Password',
    type: 'password',
    disabled: false,
  },
}

export const Search: Story = {
  args: {
    label: 'Label',
    placeholder: 'Input search',
    search: true,
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Label',
    placeholder: 'Disabled',
    disabled: true,
  },
}

export const Error: Story = {
  args: {
    label: 'Label',
    value: 'Error',
    error: 'error message',
  },
}
