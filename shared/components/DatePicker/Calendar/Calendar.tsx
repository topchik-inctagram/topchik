import { type ComponentPropsWithoutRef, useMemo } from 'react'

import { ArrowIosBackOutline, ArrowIosForwardOutline } from '@/public'
import { DayPicker } from 'react-day-picker'
import s from './Calendar.module.scss'

export type CalendarProps = ComponentPropsWithoutRef<typeof DayPicker>

export const Calendar = (props: CalendarProps) => {
  const { className, showOutsideDays = true, ...rest } = props
  const today = useMemo(() => new Date(), [])
  const classNames = {
    today: s.today,
    weekends: s.weekends,
  }

  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  return (
    <DayPicker
      className={className}
      components={{
        IconLeft: ({ ...props }) => <ArrowIosBackOutline {...props} />,
        IconRight: ({ ...props }) => <ArrowIosForwardOutline {...props} />,
      }}
      modifiers={{
        weekend: day =>
          (day.getDay() === 0 || day.getDay() === 6) &&
          day.getMonth() === currentMonth &&
          day.getFullYear() === currentYear,
      }}
      modifiersClassNames={{
        today: classNames.today,
        weekend: classNames.weekends,
      }}
      showOutsideDays={showOutsideDays}
      weekStartsOn={1}
      {...rest}
    />
  )
}
Calendar.displayName = 'Calendar'
