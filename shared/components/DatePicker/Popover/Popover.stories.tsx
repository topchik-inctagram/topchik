import type { Meta, StoryObj } from '@storybook/react'

import { CalendarOutline } from '@/public'
import { Label, Popover, PopoverContent, PopoverTrigger, Typography } from '@/shared/components'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Popover>

export const PopoverDefault: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger>
            <Typography variant={'regular_16'} as={'span'}>
              Select date
            </Typography>
            <CalendarOutline />
          </PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
      </div>
    )
  },
}

export const PopoverWithError: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger error>
            <Typography variant={'regular_16'} as={'span'}>
              Select date
            </Typography>
            <CalendarOutline />
          </PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
      </div>
    )
  },
}
