import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RadioGroup } from '@/shared/components'
import { RadioItem } from './RadioItem'

const meta = {
  component: RadioGroup,
  title: 'Components/RadioGroup',
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const ControlledRadioGroup: Story = {
  render: args => {
    const [selectedValue, setSelectedValue] = useState('pre-junior')

    return (
      <div>
        <RadioGroup {...args} value={selectedValue} onValueChange={setSelectedValue}>
          <RadioItem value="pre-junior">Pre-junior</RadioItem>
          <RadioItem value="junior">Junior</RadioItem>
          <RadioItem value="junior-plus">Junior +</RadioItem>
        </RadioGroup>
        <span style={{ marginTop: '15px', display: 'inline-block' }}>
          {`Selected option: ${selectedValue}`}
        </span>
      </div>
    )
  },
}

export const DefaultValueRadioGroup: Story = {
  args: {
    defaultValue: 'pre-junior',
  },
  render: args => (
    <RadioGroup {...args}>
      <RadioItem value="pre-junior">Pre-junior</RadioItem>
      <RadioItem value="junior">Junior</RadioItem>
      <RadioItem value="junior-plus">Junior +</RadioItem>
    </RadioGroup>
  ),
}

export const DisabledRadioGroup: Story = {
  args: {
    defaultValue: 'pre-junior',
  },
  render: args => (
    <RadioGroup {...args}>
      <RadioItem disabled value="pre-junior">Pre-junior</RadioItem>
      <RadioItem disabled value="junior">Junior</RadioItem>
      <RadioItem disabled value="junior-plus">Junior +</RadioItem>
    </RadioGroup>
  ),
}
