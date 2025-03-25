import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from '@/shared/components'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker/Datepicker',
  component: DatePicker,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DatePicker>

const DatePickerRangeWrapper = ({
  mode,
  error = '',
  disabled = false,
}: {
  mode: 'range' | 'single'
  error?: string
  disabled?: boolean
}) => {
  const [date, setDate] = useState<DateRange | Date>()
  return (
    <DatePicker
      dateValue={date}
      disabled={disabled}
      error={error}
      mode={mode}
      onChangeDate={setDate}
    />
  )
}

export const DatePickerRange: Story = {
  render: () => <DatePickerRangeWrapper mode="range" />,
}

export const DatePickerSingle: Story = {
  render: () => <DatePickerRangeWrapper mode="single" />,
}

export const DatePickerWithError: Story = {
  render: () => <DatePickerRangeWrapper error="Wrong date range" mode="single" />,
}

export const DatePickerDisabled: Story = {
  render: () => <DatePickerRangeWrapper disabled mode="range" />,
}
