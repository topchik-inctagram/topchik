import {
  PostModalPhotoSlider,
  type PostModalPhotoSliderProps,
} from '@/entities/PostModalPhotoSlider'
import { PostModalTitle, type PostModalTitleProps } from '@/entities/PostModalTitle'
import {
  UsersCommentsGuestViewport,
  type UsersCommentsGuestViewportProps,
} from '@/entities/UsersCommentsViewport'
import {
  PostLikesAndShareBar,
  type PostLikesAndShareBarProps,
} from '@/entities/PostLikesAndShareBar'
import type { Prettify } from '@/shared/utils'
import { Modal } from '@/shared/components'
import s from './PostModal.module.scss'

type Props = PostModalPhotoSliderProps &
  PostModalTitleProps &
  UsersCommentsGuestViewportProps &
  PostLikesAndShareBarProps

type PostModalProps = Prettify<Props>

export const PostModal = ({
  photoContent,
  postAuthorHref,
  postAuthorAlt,
  postAuthorSrc,
  author,
  comments,
  likeAuthorImage,
  likesCount,
  postCreateDate,
}: PostModalProps) => {
  return (
    <Modal open className={s.modal} size="postSize">
      <div className={s.container}>
        <PostModalPhotoSlider photoContent={photoContent} />
        <div className={s.contentContainer}>
          <PostModalTitle
            author={author}
            postAuthorAlt={postAuthorAlt}
            postAuthorHref={postAuthorHref}
            postAuthorSrc={postAuthorSrc}
          />
          <UsersCommentsGuestViewport comments={comments} />
          <PostLikesAndShareBar
            likeAuthorImage={likeAuthorImage}
            likesCount={likesCount}
            postCreateDate={postCreateDate}
          />
        </div>
      </div>
    </Modal>
  )
}
