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
import { type DateRange, type DayPicker } from 'react-day-picker'
import clsx from 'clsx'
import s from './DatePicker.module.scss'

type Props = {
  error?: string
  mode?: ComponentPropsWithoutRef<typeof DayPicker>['mode']
  onChangeDate: (date: Date | DateRange) => void
  dateValue: Date | DateRange | undefined
}

export const DatePicker = (props: Props) => {
  const { error, mode = 'range', onChangeDate, dateValue } = props

  const classNames = {
    error: clsx(s.error),
  }

  const SELECT_DATE = 'Select date'
  const RANGE_MODE = mode === 'range'
  const SINGLE_MODE = mode === 'single'

  const [displayValue, setDisplayValue] = useState<{ single?: string; range?: DateRange }>({})

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

    const current = displayValue.range

    if (current?.from && current?.to) {
      onChangeDate({ from: day, to: undefined })
    } else if (current?.from) {
      onChangeDate({
        from: day < current.from ? day : current.from,
        to: day < current.from ? current.from : day,
      })
    } else {
      onChangeDate({ from: day, to: undefined })
    }
  }

  return (
    <>
      <Label>Date</Label>
      <Popover>
        <PopoverTrigger error={!!error}>
          <Typography as="span" variant="regular_16">
            {RANGE_MODE && displayValue.range?.from && displayValue.range?.to
              ? formatRange(displayValue.range)
              : SINGLE_MODE && displayValue.single
                ? displayValue.single
                : SELECT_DATE}
          </Typography>
          <CalendarOutline />
        </PopoverTrigger>
        <PopoverContent sideOffset={-16}>
          {RANGE_MODE && (
            <Calendar mode="range" selected={displayValue.range} onDayClick={handleDateChange} />
          )}
          {SINGLE_MODE && (
            <Calendar
              initialFocus
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
