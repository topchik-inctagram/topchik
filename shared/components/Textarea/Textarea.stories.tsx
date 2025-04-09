import { type Meta, type StoryObj } from '@storybook/react'

import { type ChangeEvent, useRef, useState } from 'react'
import { Button, Textarea } from '@/shared/components'

const meta = {
  component: Textarea,
  title: 'Components/Textarea',
  args: {
    label: 'enter message',
  },
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultTextArea: Story = {
  render: args => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Textarea ref={textareaRef} label={args.label} placeholder="Enter your message here " />
      </div>
    )
  },
}

export const ErrorOutputInArea: Story = {
  render: args => {
    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Textarea error="Error text" label={args.label} placeholder="Enter your message here " />
      </div>
    )
  },
}

export const DisabledTextArea: Story = {
  render: args => {
    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Textarea disabled label={args.label} placeholder="Enter your message here " />
      </div>
    )
  },
}

export const ControlledTextArea: Story = {
  render: args => {
    const [value, setValue] = useState('')
    const [displayedText, setDisplayedText] = useState('')

    const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)
    }

    const handleButtonClick = () => {
      setDisplayedText(value)
      setValue('')
    }

    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Textarea
          label={args.label}
          placeholder="Enter your message here "
          value={value}
          onChange={handleValueChange}
        />
        <Button style={{ marginTop: '10px' }} onClick={handleButtonClick}>
          Show message
        </Button>
        {displayedText && <p style={{ marginTop: '10px' }}>Message: {displayedText}</p>}
      </div>
    )
  },
}
