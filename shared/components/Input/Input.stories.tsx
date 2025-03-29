import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/shared/components'
import { type ComponentPropsWithRef, useState } from 'react'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof Input>

const InputWrapper = (args: ComponentPropsWithRef<typeof Input>) => {
  const [value, setValue] = useState('')
  const handleSearch = () => {
    console.log('Поиск по:', value)
  }

  const handleClear = () => {
    setValue('')
  }
  return (
    <Input
      {...args}
      value={value}
      onChangeValue={setValue}
      onClear={handleClear}
      onKeyEnter={handleSearch}
    />
  )
}

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter name',
    type: 'text',
  },
  render: args => <InputWrapper {...args} />,
}

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
  },
  render: args => <InputWrapper {...args} />,
}

export const Email: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@email.com',
    type: 'email',
  },
  render: args => <InputWrapper {...args} />,
}

export const Search: Story = {
  args: {
    placeholder: 'Searching...',
    type: 'search',
  },
  render: args => {
    return <InputWrapper {...args} />
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Disabled input',
    disabled: true,
  },
  render: args => <InputWrapper {...args} />,
}

export const Error: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@email',
    type: 'email',
    error: 'Invalid email format',
  },
  render: args => <InputWrapper {...args} />,
}
