import { OutlineBell } from '@/public/icons'
import s from './NotificationBell.module.scss'
import { Typography } from '@/shared/components/Typography'

type Props = {
  count?: number
}

export const NotificationBell = ({ count = 0 }: Props) => {
  const ClassNames = {
    bellWrapper: s.bellWrapper,
    notification: s.notification,
  }
  return (
    <div className={ClassNames.bellWrapper}>
      <OutlineBell />
      {count > 0 && (
        <Typography as="span" className={ClassNames.notification} variant="small">
          {count}
        </Typography>
      )}
    </div>
  )
}
