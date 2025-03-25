import { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'
import {Button} from '@/shared/components/Button/Button'
import React, { useRef, useState } from 'react'


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
        <Textarea ref={textareaRef} titleLabel={args.titleLabel} placeholder="Enter your message here "/>
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
        <Textarea titleLabel={args.titleLabel} error={args.error} placeholder="Enter your message here "/>
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
        <Textarea titleLabel={args.titleLabel} disabled={args.disabled} placeholder="Enter your message here "/>
      </div>
    )
  },
}

export const ControlledTextArea: Story = {
  args: {
    titleLabel: 'enter message',
  },
  render: args => {
    const [value, setValue] = useState('')
    const [displayedText, setDisplayedText] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)
    }

    const handleButtonClick = () => {
      setDisplayedText(value)
      setValue('')
    }

    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Textarea
          titleLabel={args.titleLabel}
          value={value}
          onChange={handleChange}
          placeholder="Enter your message here "
        />
        <Button onClick={handleButtonClick} style={{ marginTop: '10px' }}>
          Show message
        </Button>
        {displayedText && (
          <p style={{ marginTop: '10px' }}>Message: {displayedText}</p>
        )}
      </div>
    )
  },
}
