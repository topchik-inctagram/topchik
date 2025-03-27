import {
  Calendar,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Typography,
} from '@/shared/components'
import { CalendarOutline } from '@/public'
import { type ComponentPropsWithoutRef, useEffect, useId, useState } from 'react'
import { type DateRange, type DayPicker } from 'react-day-picker'
import { format, parse } from 'date-fns'
import s from './DatePicker.module.scss'
import { enGB } from 'date-fns/locale/en-GB'

type Props = {
  error?: string
  mode: ComponentPropsWithoutRef<typeof DayPicker>['mode']
  onChangeDate: (date: Date | DateRange) => void
  dateValue: Date | DateRange | undefined
  id?: string
  disabled?: boolean
}

export const DatePicker = (props: Props) => {
  const { error, mode, onChangeDate, id, disabled, dateValue } = props

  const classNames = {
    error: s.error,
  }
  const idFromHook = useId()
  const idForLabel = id ?? idFromHook
  const SELECT_DATE = 'Select date'
  const isRangeMode = mode === 'range'
  const isSingleMode = mode === 'single'

  const [displayValue, setDisplayValue] = useState<{ single?: string; range?: DateRange }>({})

  useEffect(() => {
    if (dateValue instanceof Date) {
      setDisplayValue({
        single: format(dateValue, 'dd/MM/yyyy', { locale: enGB }),
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

  //todo maybe move to utils
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
  // to fix bug for single date mode
  const parseDateString = (dateStr: string) => {
    return parse(dateStr, 'dd/MM/yyyy', new Date(), { locale: enGB })
  }

  const formatRange = (range: DateRange) => {
    const startDate = range.from ? format(range.from, 'dd/MM/yyyy') : ''
    const endDate = range.to ? format(range.to, 'dd/MM/yyyy') : ''
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
      <Label disabled={disabled} htmlFor={idForLabel}>
        Date
      </Label>
      <Popover>
        <PopoverTrigger disabled={disabled} error={!!error} id={idForLabel}>
          <Typography as="span" variant="regular_16">
            {isRangeMode && displayValue.range?.from && displayValue.range?.to
              ? formatRange(displayValue.range)
              : isSingleMode && displayValue.single
                ? displayValue.single
                : SELECT_DATE}
          </Typography>
          <CalendarOutline />
        </PopoverTrigger>
        <PopoverContent sideOffset={-16}>
          {isRangeMode && (
            <Calendar
              initialFocus
              mode="range"
              selected={displayValue.range}
              onDayClick={handleDateChange}
            />
          )}
          {isSingleMode && (
            <Calendar
              key={displayValue.single}
              initialFocus
              mode="single"
              selected={displayValue.single ? parseDateString(displayValue.single) : undefined}
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
