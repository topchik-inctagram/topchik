import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Select } from './Select'
import RU from '../../../public/icons/FlagRussia'
import EN from '../../../public/icons/FlagUnitedKingdom'

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
export const PaginationVariant: Story = {
  args: {
    pagination: true,
    options: [
      { value: '5', label: '5' },
      { value: '10', label: '10' },
      { value: '20', label: '20' },
      { value: '30', label: '30' },
      { value: '40', label: '40' },
    ],
  },
  render: args => {
    const [value, setValue] = useState(args.options[1].value)
    return (
      <div>
        <Select {...args} value={value} onChangeSelect={setValue} />
      </div>
    )
  },
}

export const LanguageSwitcher: Story = {
  render: () => {
    const [language, setLanguage] = useState('RU')
    const languages = [
      { value: 'RU', label: 'Russian', icon: <RU /> },
      { value: 'EN', label: 'English', icon: <EN /> },
    ]

    return (
      <Select
        options={languages}
        value={language}
        onChangeSelect={setLanguage}
        placeholder="Select language"
      />
    )
  },
}
