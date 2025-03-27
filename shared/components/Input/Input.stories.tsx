import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/shared/components'
import { useState } from 'react'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    disabled: false,
    label: '',
    placeholder: '',
    type: 'text',
    error: '',
    search: false,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof Input>

const InputWrapper = (args: React.ComponentProps<typeof Input>) => {
  return <Input {...args} />
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
    search: true,
    type: 'search',
  },
  render: args => {
    const [value, setValue] = useState('')

    const handleSearch = () => {
      console.log('Поиск по:', value)
    }

    const handleClear = () => {
      setValue('')
    }

    return (
      <InputWrapper
        {...args}
        value={value}
        onEnterPress={handleSearch}
        onSearchClick={handleSearch}
        onChangeValue={setValue}
        onClear={handleClear}
      />
    )
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
