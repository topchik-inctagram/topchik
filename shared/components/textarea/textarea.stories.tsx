import { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'
import React, { useRef } from 'react'

const meta = {
  component: Textarea,
  title: 'Components/Textarea',
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultTextArea: Story = {
  args: {
    titleLabel: 'enter message',
  },
  render: args => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Textarea ref={textareaRef} titleLabel={args.titleLabel} />
      </div>
    )
  },
}

export const ErrorOutputInArea: Story = {
  args: {
    error: 'Error text',
    titleLabel: 'enter message',
  },
  render: args => {
    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Textarea titleLabel={args.titleLabel} error={args.error} />
      </div>
    )
  },
}

export const DisabledTextArea: Story = {
  args: {
    disabled: true,
    titleLabel: 'enter message',
  },
  render: args => {
    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Textarea titleLabel={args.titleLabel} disabled={args.disabled} />
      </div>
    )
  },
}
