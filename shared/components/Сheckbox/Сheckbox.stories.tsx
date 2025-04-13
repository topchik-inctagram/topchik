import { type Meta, type StoryObj } from '@storybook/react'
import { Checkbox } from '@/shared/components'
import { useState } from 'react'
import { CheckedState } from '@radix-ui/react-checkbox'

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/UI/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Uncontrolled: Story = {
  args: {
    disabled: false,
    label: 'Check-box',
  },
}


export const Controlled: Story = {
  args:{
    disabled:false
  },
  render: (args) => {
    const [checked, setChecked] = useState<CheckedState>(false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onCheckedChange={(checked)=>{console.log(checked);setChecked(checked)}}
        label={'Click here'}
      />
    );
  },
};