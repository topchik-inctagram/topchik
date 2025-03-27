import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
}

export default meta

type Story = StoryObj<typeof Select>

export const Uncontrolled: Story = {
  args: {
    disabled: false,
    label: 'Select-Box',
    value: '',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'orange', label: 'Orange' },
      { value: 'banana', label: 'Banana' },
      { value: 'grape', label: 'Grape' },
    ],
  },
}

export const Controlled: Story = {
  render: args => {
    const [select, setSelect] = useState<string>('')

    return (
      <Select
        {...args}
        label="Select-Box"
        value={select}
        onChange={setSelect}
        options={[
          { value: 'apple', label: 'Apple' },
          { value: 'orange', label: 'Orange' },
          { value: 'banana', label: 'Banana' },
          { value: 'grape', label: 'Grape' },
        ]}
      />
    )
  },
}
