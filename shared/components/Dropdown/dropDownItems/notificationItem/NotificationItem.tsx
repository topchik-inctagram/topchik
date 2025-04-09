import { type ComponentPropsWithRef } from 'react'
import s from './NotificationItem.module.scss'
import { Typography } from '@/shared/components'

type Props = {
  title: string
  tag?: string
  message: string
  date: string
} & Omit<ComponentPropsWithRef<'div'>, 'onChange'>

export const NotificationItem = ({ title, tag, message, date, onClick, ...rest }: Props) => {
  const classNames = {
    notification: s.notification,
    header: s.header,
    title: s.title,
    tag: s.tag,
    message: s.message,
    date: s.date,
  }

  return (
    <div className={classNames.notification} onClick={onClick} {...rest}>
      <div className={classNames.header}>
        <Typography as="h4" className={classNames.title} variant="bold_14">
          {title}
        </Typography>
        {tag && (
          <Typography as="span" className={classNames.tag} variant="regular_14">
            {tag}
          </Typography>
        )}
      </div>
      <Typography as="p" className={classNames.message} variant="regular_14">
        {message}
      </Typography>

      <Typography as="span" className={classNames.date} variant="small">
        {date}
      </Typography>
    </div>
  )
}
