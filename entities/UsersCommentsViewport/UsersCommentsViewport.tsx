import { UserSmallPhoto, type UserSmallPhotoProps } from '@/entities/UserSmallPhoto'
import { UserComment, type UserCommentProps } from '@/entities/UserComment'
import type { Prettify } from '@/shared/utils'
import s from './UsersCommentsViewport.module.scss'
import { ScrollArea } from '@/shared/components'

type Props = (UserSmallPhotoProps & UserCommentProps)[]

export type UsersCommentsGuestViewportProps = {
  comments: Prettify<Props>
}

export const UsersCommentsGuestViewport = ({ comments }: UsersCommentsGuestViewportProps) => {
  return (
    <div className={s.contentWrapper}>
      <ScrollArea>
        {comments.map((u, i) => (
          <div key={i} className={s.container}>
            <UserSmallPhoto alt={u.alt} src={u.src} />
            <UserComment
              author={u.author}
              className={s.userComment}
              comment={u.comment}
              created={u.created}
              href={u.href}
            />
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
