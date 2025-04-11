import { type Meta, type StoryObj } from '@storybook/react';
import { Checkbox } from '@/shared/components';

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/UI/Checkbox',
  args: {
    label: 'Checkbox',
    disabled: false,
    checked: false,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable checkbox',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    label: {
      control: 'text',
      description: 'Checkbox label',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  args: {
    checked: false,
    label: 'Check-box',
  },
  render: (args, { updateArgs }) => (
    <Checkbox
      {...args}
      label={'Check-box'}
      onCheckedChange={(value) => updateArgs({ checked: value })} 
    />
  ),
}