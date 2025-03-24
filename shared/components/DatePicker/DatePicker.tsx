import {
  Calendar,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Typography,
} from '@/shared/components'
import { CalendarOutline } from '@/public'
import { type ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { type DayPicker, type DateRange } from 'react-day-picker'
import clsx from 'clsx'
import s from './DatePicker.module.scss'

type Props = {
  error?: string
  mode?: ComponentPropsWithoutRef<typeof DayPicker>['mode']
  onChangeDate: (date: Date | DateRange | undefined) => void
  dateValue: Date | DateRange | undefined
}

export const DatePicker = (props: Props) => {
  const { error, mode = 'range', onChangeDate, dateValue } = props

  const classNames = {
    error: clsx(s.error),
  }

  const selectDate = 'Select date'
  const rangeMode = mode === 'range'
  const singleMode = mode === 'single'

  // Локальное состояние для отображения дат
  const [displayValue, setDisplayValue] = useState<{ single?: string; range?: DateRange }>({})

  // Обновляем отображаемые значения при изменении dateValue
  useEffect(() => {
    if (dateValue instanceof Date) {
      setDisplayValue({
        single: dateValue.toLocaleDateString(),
        range: undefined,
      })
    } else if (isDateRange(dateValue)) {
      setDisplayValue({
        single: undefined,
        range: dateValue,
      })
    } else {
      setDisplayValue({})
    }
  }, [dateValue])

  const isDateRange = (obj: unknown): obj is DateRange => {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      'from' in obj &&
      'to' in obj &&
      (obj.from === undefined || obj.from instanceof Date) &&
      (obj.to === undefined || obj.to instanceof Date)
    )
  }

  const formatRange = (range: DateRange) => {
    const startDate = range.from?.toLocaleDateString() ?? ''
    const endDate = range.to?.toLocaleDateString() ?? ''
    return `${startDate} - ${endDate}`
  }

  const handleDateChange = (day: Date) => {
    if (mode !== 'range') {
      onChangeDate(day)
      return
    }

    const currentRange = displayValue.range

    if (currentRange?.from && currentRange?.to) {
      // Сброс диапазона при выборе новой начальной даты
      onChangeDate({ from: day, to: undefined })
    } else if (currentRange?.from) {
      // Выбор конечной даты
      if (currentRange.from > day) {
        onChangeDate({ from: day, to: currentRange.from })
      } else {
        onChangeDate({ from: currentRange.from, to: day })
      }
    } else {
      // Выбор начальной даты
      onChangeDate({ from: day, to: undefined })
    }
  }

  return (
    <>
      <Label>Date</Label>
      <Popover>
        <PopoverTrigger>
          <Typography as="span" variant="regular_16">
            {rangeMode && displayValue.range?.from && displayValue.range?.to
              ? formatRange(displayValue.range)
              : singleMode && displayValue.single
                ? displayValue.single
                : selectDate}
          </Typography>
          <CalendarOutline />
        </PopoverTrigger>
        <PopoverContent>
          {rangeMode && (
            <Calendar mode="range" selected={displayValue.range} onDayClick={handleDateChange} />
          )}
          {singleMode && (
            <Calendar
              mode="single"
              selected={displayValue.single ? new Date(displayValue.single) : undefined}
              onDayClick={handleDateChange}
            />
          )}
        </PopoverContent>
      </Popover>
      {error && (
        <Typography as="span" className={classNames.error} variant="small">
          {error}
        </Typography>
      )}
    </>
  )
}
//   return (
//     <>
//       <Label>Date</Label>
//       <Popover>
//         <PopoverTrigger>
//           <Typography as="span" variant="regular_16">
//             {rangeMode && dateToRangeSelect?.from && dateToRangeSelect?.to
//               ? formatRange(dateToRangeSelect)
//               : 'Select date'}
//             {singleMode && dateToSingleSelect}
//           </Typography>
//           <CalendarOutline />
//         </PopoverTrigger>
//         <PopoverContent>
//           {rangeMode && (
//             <Calendar mode="range" selected={dateToRangeSelect} onDayClick={handleDateChange} />
//           )}
//           {mode === 'single' && (
//             <Calendar mode="range" selected={dateToRangeSelect} onDayClick={handleDateChange} />
//           )}
//         </PopoverContent>
//       </Popover>
//       {error && (
//         <Typography as="span" className={classNames.error} variant="small">
//           {error}
//         </Typography>
//       )}
//     </>
//   )
// }
