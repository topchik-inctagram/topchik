import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import type { DateRange } from 'react-day-picker'
import { Calendar } from '@/shared/components'

const meta: Meta<typeof Calendar> = {
  title: 'Components/Datepicker/Calendar',
  component: Calendar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Calendar>

export const CalendarRangeMode: Story = {
  render: () => {
    const [selected, setSelected] = useState<DateRange>()
    const handleSelect = (newSelected: any) => {
      setSelected(newSelected)
    }
    return <Calendar mode="range" selected={selected} onSelect={handleSelect} />
  },
}

export const CalendarSingleMode: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date>()
    return <Calendar mode="single" selected={selected} onSelect={setSelected} />
  },
}
