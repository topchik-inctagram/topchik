import { Typography } from '@/shared/components'
import s from './RegisteredUsersBar.module.scss'

type Props = {
  usersCount: number
}
export const RegisteredUsersBar = ({ usersCount }: Props) => {
  const totalUsersNumberToDisplay = usersCount.toString().padStart(6, '0').split('')
  return (
    <div className={s.container}>
      <Typography className={s.title} variant="h2">
        Registered users:
      </Typography>
      <div className={s.valueContainer}>
        {totalUsersNumberToDisplay.map((t, i) => (
          <Typography key={i} as="span" className={s.value} variant="h2">
            {t}
          </Typography>
        ))}
      </div>
    </div>
  )
}
