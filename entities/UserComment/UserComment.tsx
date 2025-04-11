import { Typography } from '@/shared/components/Typography'
import s from './UserComment.module.scss'
type Props = {
  author: string
  comment: string
  created: string
}

export const UserComment = ({ comment, author, created }: Props) => {
  return (
    <div className={s.container}>
      <div>
        <Typography as="span" variant="bold_14">
          {author}
        </Typography>{' '}
        <Typography className={s.commentPost} variant="regular_14">
          {comment}
        </Typography>
      </div>
      <Typography className={s.createdDate} variant="small">
        {created}
      </Typography>
    </div>
  )
}
