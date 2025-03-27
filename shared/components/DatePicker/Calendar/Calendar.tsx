import { type ComponentPropsWithoutRef, useMemo } from 'react'

import { ArrowIosBackOutline, ArrowIosForwardOutline } from '@/public'
import { DayPicker } from 'react-day-picker'
import s from './Calendar.module.scss'

export type CalendarProps = ComponentPropsWithoutRef<typeof DayPicker>

export const Calendar = (props: CalendarProps) => {
  const { className, classNames: classNamesP, showOutsideDays = true, ...rest } = props
  const today = useMemo(() => new Date(), [])

  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  return (
    <DayPicker
      className={className}
      classNames={{
        // Основные контейнеры
        root: s.root,
        months: s.months,
        month: s.month,

        // Заголовок и навигация
        caption: s.caption,
        caption_label: s.captionLabel,
        nav: s.nav,
        nav_button: s.navButton,

        // Таблица дней
        table: s.table,
        head_row: s.headRow,
        head_cell: s.headCell,
        row: s.row,
        cell: s.cell,

        // Дни
        day: s.day,
        day_range_start: s.dayRangeStart,
        day_range_end: s.dayRangeEnd,
        day_range_middle: s.dayRangeMiddle,
        day_selected: s.daySelected,
        day_today: s.today,
        day_outside: s.dayOutside,
        ...classNamesP,
      }}
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
        weekend: s.weekend,
      }}
      showOutsideDays={showOutsideDays}
      weekStartsOn={1}
      {...rest}
    />
  )
}
Calendar.displayName = 'Calendar'
