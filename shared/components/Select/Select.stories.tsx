import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Select } from './Select'
import RussFlag from '../../../public/icons/FlagRussia'
import UKFlag from '../../../public/icons/FlagUnitedKingdom'

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
        onChangeSelect={setSelect}
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

export const Pagination: Story = {
  render: args => {
    const [pageSize, setPageSize] = useState<string>('10')

    return (
      <Select
        {...args}
        pagination={true}
        label="Items per page"
        value={pageSize}
        onChangeSelect={setPageSize}
        options={[
          { value: '5', label: '5' },
          { value: '10', label: '10' },
          { value: '20', label: '20' },
          { value: '50', label: '50' },
          { value: '100', label: '100' },
        ]}
      />
    )
  },
}
