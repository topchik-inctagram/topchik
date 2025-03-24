import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from '@/shared/components'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker', // Название вашего компонента в Storybook
  component: DatePicker,
  tags: ['autodocs'], // Автоматическая документация
}

export default meta

type Story = StoryObj<typeof DatePicker>

const DatePickerRangeWrapper = ({ mode = 'range' }: { mode?: 'range' | 'single' }) => {
  const [date, setDate] = useState<DateRange | Date>()
  return <DatePicker dateValue={date} mode={mode} onChangeDate={setDate} />
}

export const DatePickerRange: Story = {
  render: () => <DatePickerRangeWrapper />,
}

export const DatePickerSingle: Story = {
  render: () => <DatePickerRangeWrapper mode="single" />,
}
