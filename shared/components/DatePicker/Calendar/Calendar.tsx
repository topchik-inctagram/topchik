import type { ComponentPropsWithoutRef } from 'react'

import { ArrowIosBackOutline, ArrowIosForwardOutline } from '@/public'
import { DayPicker } from 'react-day-picker'
import s from './Calendar.module.scss'
import clsx from 'clsx'

export type CalendarProps = ComponentPropsWithoutRef<typeof DayPicker>

export const Calendar = (props: CalendarProps) => {
  const { className, showOutsideDays = true, ...rest } = props

  const today = new Date() // Получаем текущую дату
  const currentMonth = today.getMonth() // Получаем номер текущего месяца
  const currentYear = today.getFullYear() // Получаем текущий год
  return (
    <DayPicker
      className={clsx(s.rdpRoot, className)}
      components={{
        IconLeft: ({ ...props }) => <ArrowIosBackOutline {...props} />,
        IconRight: ({ ...props }) => <ArrowIosForwardOutline {...props} />,
      }}
      modifiers={{
        weekend: day =>
          (day.getDay() === 0 || day.getDay() === 6) && // Проверяем, что день — суббота или воскресенье
          day.getMonth() === currentMonth && // Проверяем, что месяц совпадает с текущим
          day.getFullYear() === currentYear, // Проверяем, что год тоже совпадает (на случай, если календарь переключают)
      }}
      modifiersClassNames={{
        today: s.today,
        weekend: s.weekends,
      }}
      showOutsideDays={showOutsideDays}
      weekStartsOn={1}
      {...rest}
    />
  )
}
Calendar.displayName = 'Calendar'
