import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Select } from './Select'
import RussiaFlag from '@/public/icons/FlagRussia'
import UnitedKingdomFlag from '@/public/icons/FlagUnitedKingdom'

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
  },
  render: args => (
    <Select {...args}>
      <Select.Item value="apple">Apple</Select.Item>
      <Select.Item value="orange">Orange</Select.Item>
      <Select.Item value="banana">Banana</Select.Item>
      <Select.Item value="grape">Grape</Select.Item>
    </Select>
  ),
}

export const Controlled: Story = {
  render: args => {
    const ControlledSelect = () => {
      const [select, setSelect] = useState<string>('')

      return (
        <Select {...args} value={select} onValueChange={setSelect}>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="orange">Orange</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="grape">Grape</Select.Item>
        </Select>
      )
    }

    return <ControlledSelect />
  },
}

export const PaginationVariant: Story = {
  args: {
    isPagination: true,
  },
  render: args => {
    const PaginationSelect = () => {
      const [value, setValue] = useState('10')

      return (
        <Select {...args} value={value} onValueChange={setValue}>
          <Select.Item value="5">5</Select.Item>
          <Select.Item value="10">10</Select.Item>
          <Select.Item value="20">20</Select.Item>
          <Select.Item value="30">30</Select.Item>
          <Select.Item value="40">40</Select.Item>
        </Select>
      )
    }

    return <PaginationSelect />
  },
}

export const LanguageSwitcher: Story = {
  render: () => {
    const LanguageSwitcherSelect = () => {
      const [language, setLanguage] = useState('RU')

      return (
        <Select
          isLanguageSwitcher
          placeholder="Select language"
          value={language}
          onValueChange={setLanguage}
        >
          <Select.Item value="RU">
            <RussiaFlag /> Russian
          </Select.Item>
          <Select.Item value="EN">
            <UnitedKingdomFlag /> English
          </Select.Item>
        </Select>
      )
    }

    return <LanguageSwitcherSelect />
  },
}
