import { Typography } from '@/shared/components/Typography'
import s from './UserComment.module.scss'
import { UserProfileLink } from '@/entities/UserProfileLink'
import clsx from 'clsx'

export type UserCommentProps = {
  author: string
  comment: string
  created: string
  href: string
  className?: string
}

export const UserComment = ({ href, comment, author, created, className }: UserCommentProps) => {
  return (
    <div className={clsx(s.container, className)}>
      <div>
        <UserProfileLink href={href} userName={author} variant="bold_14" />{' '}
        <Typography className={s.commentPost} variant="regular_14">
          {comment}
        </Typography>
      </div>
      <Typography as="span" className={s.createdDate} variant="small">
        {created}
      </Typography>
    </div>
  )
}
