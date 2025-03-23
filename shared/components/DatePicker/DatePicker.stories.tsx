import type { Meta, StoryObj } from '@storybook/react'
import {
  DatePicker,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Typography,
} from '@/shared/components'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { CalendarOutline } from '@/public'
import { Calendar } from '@/shared/components/DatePicker/Calendar'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker', // Название вашего компонента в Storybook
  component: DatePicker,
  tags: ['autodocs'], // Автоматическая документация
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const DatePickerS: Story = {
  render: () => {
    const [selectedRange, setSelectedRange] = useState<DateRange>()
    const formatRange = (range: { from: Date; to: Date }) => {
      const startDate = range.from.toLocaleDateString()
      const endDate = range.to.toLocaleDateString()
      return `${startDate} - ${endDate}`
    }

    const handleDateChange = (day: Date) => {
      if (selectedRange?.from && selectedRange?.to) {
        // Если уже выбраны 2 даты, сбрасываем выбор
        setSelectedRange({ from: day, to: undefined }) // Сбрасываем и начинаем новый диапазон
      } else if (selectedRange?.from) {
        // Если выбрана только начальная дата, проверяем порядок и выбираем конечную дату
        if (selectedRange.from > day) {
          // Если выбрана дата, которая раньше начальной, меняем местами
          setSelectedRange({ from: day, to: selectedRange.from })
        } else {
          setSelectedRange({ from: selectedRange.from, to: day })
        }
      } else {
        // Если не выбрана начальная дата, выбираем её
        setSelectedRange({ from: day, to: undefined })
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger>
            <Typography variant={'regular_16'} as={'span'}>
              {selectedRange?.from && selectedRange?.to
                ? formatRange(selectedRange as { from: Date; to: Date })
                : 'Select date'}
            </Typography>
            <CalendarOutline />
          </PopoverTrigger>
          <PopoverContent>
            <Calendar mode={'range'} selected={selectedRange} onDayClick={handleDateChange} />
          </PopoverContent>
        </Popover>
      </div>
    )
  },
}
