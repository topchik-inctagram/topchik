import * as Dialog from '@radix-ui/react-dialog'
import { CloseOutline } from '@/public/icons'
import s from './PostModal.module.scss'
import { UserSmallPhoto } from '@/entities/UserSmallPhoto'
import { UserProfileLink } from '@/entities/UserProfileLink'
import type { StaticImageData } from 'next/image'

export type PostModalTitleProps = {
  author: string
  postAuthorHref: string
  postAuthorSrc: StaticImageData
  postAuthorAlt: string
}

export const PostModalTitle = ({
  postAuthorSrc,
  postAuthorAlt,
  author,
  postAuthorHref,
}: PostModalTitleProps) => {
  const classNames = {
    closeButton: s.closeButton,
    container: s.container,
    userContainer: s.userContainer,
  }

  return (
    <div className={classNames.container}>
      <div className={classNames.userContainer}>
        <UserSmallPhoto alt={postAuthorAlt} src={postAuthorSrc} />
        <Dialog.Title asChild>
          <UserProfileLink href={postAuthorHref} userName={author} />
        </Dialog.Title>
      </div>

      <Dialog.Close className={classNames.closeButton}>
        <CloseOutline aria-label="Close" />
      </Dialog.Close>
    </div>
  )
}
