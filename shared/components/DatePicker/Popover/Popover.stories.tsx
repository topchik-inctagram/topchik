import type { Meta, StoryObj } from '@storybook/react'

import { CalendarOutline } from '@/public'
import { Label, Popover, PopoverContent, PopoverTrigger, Typography } from '@/shared/components'

const meta: Meta<typeof Popover> = {
  title: 'Components/Datepicker/Popover',
  component: Popover,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Popover>

export const PopoverDefault: Story = {
  render: () => {
    return <PopoverRender />
  },
}

export const PopoverFullWidthDefault: Story = {
  render: () => {
    return <PopoverRender fullWidth />
  },
}

export const PopoverWithError: Story = {
  render: () => {
    return <PopoverRender error />
  },
}

export const PopoverDisabled: Story = {
  render: () => {
    return <PopoverRender disabled />
  },
}

function PopoverRender({
  error = false,
  fullWidth = false,
  disabled = false,
}: {
  error?: boolean
  fullWidth?: boolean
  disabled?: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Label disabled={disabled}>Date</Label>
      <Popover>
        <PopoverTrigger disabled={disabled} error={error} fullWidth={fullWidth}>
          <Typography as="span" variant="regular_16">
            Select date
          </Typography>
          <CalendarOutline />
        </PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    </div>
  )
}
