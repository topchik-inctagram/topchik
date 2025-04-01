import s from './NotificationItem.module.scss'
import { Typography } from '@/shared/components'

type NotificationItemProps = {
  title: string
  tag?: string
  message: string
  date: string
}

export const NotificationItem = ({ title, tag, message, date }: NotificationItemProps) => {
  const classNames = {
    notification: s.notification,
    header: s.header,
    title: s.title,
    tag: s.tag,
    message: s.message,
    date: s.date,
  }

  return (
    <div className={classNames.notification}>
      <div className={classNames.header}>
        <Typography as="h4" variant="bold_14" className={classNames.title}>
          {title}
        </Typography>
        {tag && (
          <Typography as="span" variant="regular_14" className={classNames.tag}>
            {tag}
          </Typography>
        )}
      </div>
      <Typography as="p" variant="regular_14" className={classNames.message}>
        {message}
      </Typography>

      <Typography as="span" variant="small" className={classNames.date}>
        {date}
      </Typography>
    </div>
  )
}
