import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import Link from 'next/link' // Импортируйте ваш компонент

const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Название вашего компонента в Storybook
  component: Button,
  tags: ['autodocs'], // Автоматическая документация
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outlined', 'miniOutlined', 'languageButton'],
    },
    asChild: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
}

export default meta

// Тип для Story
type Story = StoryObj<typeof Button>

// Primary Button
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}

// Primary Button Disabled
export const PrimaryDisabled: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
    disabled: true,
  },
}

// Secondary Button
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
}

// Secondary Button Disabled
export const SecondaryDisabled: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
    disabled: true,
  },
}

// Outlined Button
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Button',
  },
}

// Outlined Button Disabled
export const OutlinedDisabled: Story = {
  args: {
    variant: 'outlined',
    children: 'Button',
    disabled: true,
  },
}

// Mini Outlined Button
export const MiniOutlined: Story = {
  args: {
    variant: 'miniOutlined',
    children: 'Button',
  },
}

// Mini Outlined Button Disabled
export const MiniOutlinedDisabled: Story = {
  args: {
    variant: 'miniOutlined',
    children: 'Button',
    disabled: true,
  },
}

// Language Button
export const LanguageButton: Story = {
  args: {
    variant: 'languageButton',
    children: 'English',
  },
}

// Language Button Disabled
export const LanguageButtonDisabled: Story = {
  args: {
    variant: 'languageButton',
    children: 'English',
    disabled: false,
  },
}

// Button as Child
export const AsChild: Story = {
  args: {
    asChild: true,
    children: <a href="#">Link as Button</a>,
  },
}

// Button as Child Disabled
export const AsChildDisabled: Story = {
  args: {
    asChild: true,
    children: <a href="#">Link as Button Disabled</a>,
    disabled: true,
  },
}
